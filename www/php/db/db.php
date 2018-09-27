<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:02 PM
 */

require_once 'db_error.php';
mysqli_report(MYSQLI_REPORT_STRICT);

class Connection{
    const PATH = 'localhost', USERNAME = 'root', PASSWORD = 'password', DATABASE = 'smartTrack';
    private $connection;

    public function __construct(){
        $this->connection = new mysqli(self::PATH, self::USERNAME, self::PASSWORD, self::DATABASE);

        if(!$this->connection->set_charset("utf8")){
            printf("Errore nel carricare UTF8: %s\n", $this->connection->error);
        }
    }

    function __destruct(){
        $this->connection->close();
    }

    function login( $email, $password ){

        $query = "SELECT user_id, password FROM users WHERE email=? ";
        $statement = $this->parse_and_execute_select($query, "s", $email);

        if ($statement instanceof db_error)
            return $statement;

        $statement->bind_result($res_user_id, $res_pass);
        $fetch = $statement->fetch();
        $statement->close();

        if ($fetch && password_verify($password, $res_pass)) {
            return $res_user_id;
        }

        return new db_error(db_error::$ERROR_ON_LOGIN);
    }
//
//    function get_username_by_id($id){
//
//        $query = "SELECT email FROM users WHERE user_id=?";
//        $statement = $this->parse_and_execute_select($query, "i", $id);
//
//        if ($statement instanceof DbError)
//            return $statement;
//
//        $statement->bind_result($res_username);
//        $fetch = $statement->fetch();
//        $statement->close();
//
//        if ($fetch) {
//            return $res_username;
//        }
//
//        return new db_error(db_error::$ERROR_ON_GETTING_EMAIL);
//    }
    function register($email, $password){

        $hash_pass = "" . password_hash($password, PASSWORD_BCRYPT);

        $query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        $result = $this->parse_and_execute_insert($query, "ss", $email,  $hash_pass);

        if ($result instanceof db_error) {
            return $result;
        } else if ($result) {
            return $this->connection->insert_id;
        }
        return new db_error(db_error::$ERROR_ON_REGISTER);
    }
//    function insert_article($type, $name, $description, $path, $images_path, $visualizzations, $likes, $dislikes)
//    {
//        $query = 'INSERT INTO articles (type, name, description, file_path, images_path, visualizzations, likes, dislikes ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
//        $result = $this->parse_and_execute_insert($query, "sssssiii", $type, $name, $description, $path, $images_path, $visualizzations, $likes, $dislikes);
//        var_dump($result);
//        if ($result instanceof DbError){
//            return $result;
//        } else if ($result) {
//            return $this->connection->insert_id;
//        }
//        return new DbError(DbError::$ERROR_ON_REGISTER);
//    }
//    function get_articles($type){
//        $query = "SELECT name, description, file_path, images_path FROM articles WHERE type=? ";
//        $statement = $this->parse_and_execute_select($query, "s", $type);
//        if ($statement instanceof DbError)
//            return $statement;
//        $result = $statement->get_result();
//        $result_array = array();
//        //todo da mettere dove serve htmlspecialchars
//        while ($row = $result->fetch_array()) {
//            $result_array[] = array('title' => htmlspecialchars($row['name']), "description" => $row['description'], "file_path" => $row['file_path'], "images_path" => $row['images_path']);
//        }
//        return $result_array;
//    }
//    function get_article_by_title($title){
//        $query = "SELECT description, images_path FROM articles WHERE name=?";
//        $statement = $this->parse_and_execute_select($query, "s", $title);
//        if ($statement instanceof DbError)
//            return $statement;
//        $result = $statement->get_result();
//        $result_array = array();
//        //todo da mettere dove serve htmlspecialchars
//        while ($row = $result->fetch_array()) {
//            $result_array[] = array('antani' => 'antaniscapelli', "description" => $row['description'], "images_path" => $row['images_path']);
//        }
//        return $result_array;
//    }
    function get_open_kits(){
        $query = "SELECT kit_id, description, creation_date FROM kit WHERE closing_date IS NULL";
        $result = $this->connection->query($query);
        if ($result === false )
            return new db_error(db_error::$ERROR_GET_ARTICLES);

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('kit_id' => $row['kit_id'], "description" => $row['description'],
                "creation_date" => date('d/m/Y', strtotime($row['creation_date'])), "spedisci" => $row['kit_id'],
                "chiudi" => $row['kit_id']);
        }

        return $result_array;
    }

    function get_types(){
        $query = "SELECT DISTINCT obj_type FROM object";

        $result = $this->connection->query($query);

        if ($result === false )
            return new db_error(db_error::$ERROR_ON_GET_TYPES);

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('type' => $row['obj_type']);
        }

        return $result_array;
    }

    function get_objects_by_type($type){
        $query = "SELECT cod, name FROM object WHERE obj_type=? AND kit_id IS NULL";
        $statement = $this->parse_and_execute_select($query, "s", $type);

        if ($statement instanceof db_error)
            return $statement;

        $result = $statement->get_result();
        $result_array = array();

        while ($row = $result->fetch_array()) {
            $result_array[] = array("cod" => $row['cod'], "name" => $row['name']);
        }

        return $result_array;
    }

    function create_kit($description, $data){

        $this->connection->autocommit(false);
        $errors = array();

        $query = 'INSERT INTO kit (description, creation_date) VALUES (?, now())';
        $resultInsert = $this->parse_and_execute_insert($query, "s", $description);

        if($resultInsert == false){
            array_push($errors, 'insert');
        }

        $id = $this->connection->insert_id;

        foreach ($data as $datum) {
            $query = "UPDATE object SET kit_id = ? WHERE cod = ?";
            $resultUpdate = $this->parse_and_execute_select($query, "ii", $id, $datum);

            if($resultUpdate == false){
                array_push($errors, 'update');
            }
        }

        if(!empty($errors)){
            $this->connection->rollback();
        }

        $this->connection->commit();

        return $id;
    }

    function suspend_kit($data){

        $this->connection->autocommit(false);
        $errors = array();

        foreach ($data as $datum) {
            $query = 'INSERT INTO suspended_kit (object_id) VALUES (?)';
            $resultInsert = $this->parse_and_execute_insert($query, "s", $datum);


            if($resultInsert == false){
                array_push($errors, 'insert');
            }
        }

        if(!empty($errors)){
            $this->connection->rollback();
        }

        $this->connection->commit();

        return $errors;
    }

    function recover_kit(){
        $this->connection->autocommit(false);
        $error = false;

        $query = "SELECT cod, name FROM object JOIN suspended_kit ON cod = object_id";
        $queryEmtyTable = "TRUNCATE suspended_kit";

        $result = $this->connection->query($query);
        $resultEmtyTable = $this->connection->query($queryEmtyTable);

        if($result == false || $resultEmtyTable == false){
            $error = true;
        }

        if($error){
            $this->connection->rollback();
        }else {

            $this->connection->commit();

            $result_array = array();

            while ($row = mysqli_fetch_assoc($result)) {
                $result_array[] = array('name' => $row['name'], 'cod' => $row['cod']);
            }

            return $result_array;
        }

        return new db_error(db_error::$UPDATE_ARTICLE_ERROR);
    }

    /**
     * Metodo che seleziona l'errore da ritornare in funzione dell'array passato come parametro
     * @param string $errors - array contenente gli ultimi errori generati
     * @return db_error - l'errore associato alla coloonna che lo ha generato
     */
    function parse_error($errors){
        if ($errors['errno'] === 1062) {
            $column = $this->parse_string($errors['error']);
            if ($column === "'email'") {
                return new db_error(db_error::$EMAIL_ALREADY_REGISTERED);
            }
        } //else if ($errors['errno'] === 1452)
        //return new DbError(DbError::$FOREIGN_KEY_ERROR);
        var_dump('antani');
        return new db_error(db_error::$ERROR_ON_EXECUTE);
    }

    /**
     * Metodo che seleziona il nome della colonna che ha generato l'errore
     * @param $error_string - la stringa contenente il nome della colonna
     * @return string - il nome della colonna che ha generato l'errore
     */
    function parse_string($error_string){
        $split_error = explode(' ', $error_string);
        return end($split_error);
    }

    /**
     * Metodo che prepara la query, fa il bind dei parametri e la esegue, viene chiamata principalmente per le insert
     * @param string $query - la query da eseguire
     * @param string $bind_string - la stringa con il tipo degli argomenti da passare al metodo bind
     * @param array ...$params - array con i parametri da passare al bind
     * @return bool|db_error ERROR_ON_EXECUTE - se viene generato un errore in fase di esecuzione della query
     *                      - il risultato della execute altrimenti
     */
    function parse_and_execute_insert($query, $bind_string, ...$params){
        $statement = $this->connection->prepare($query);
        $bind_names[] = $bind_string;
        for ($i = 0; $i < count($params); $i++) {
            $bind_name = 'bind' . $i;
            $$bind_name = $params[$i];
            $bind_names[] = &$$bind_name;
        }
        call_user_func_array(array($statement, 'bind_param'), $bind_names);
        try {
            $result = $statement->execute();
            if ($result === false) {
                return $this->parse_error($statement->error_list[0]);
            }
        } catch (Exception $e) {
            return new db_error(db_error::$ERROR_ON_EXECUTE);
        }
        $statement->close();
        return $result;
    }

    /**
     * Metodo che prepara la query, fa il bind dei parametri e la esegue, viene chiamata principalmente per le select, update e delete
     * @param string $query - la query da eseguire
     * @param string $bind_string - la stringa con il tipo degli argomenti da passare al metodo bind
     * @param array ...$params - array con i parametri da passare al bind
     * @return db_error|mysqli_stmt ERROR_ON_EXECUTE - se viene generato un errore in fase di esecuzione della query
     *                             - lo statement ritornato dal metodo prepare()
     */
    function parse_and_execute_select($query, $bind_string, ...$params){
        $statement = $this->connection->prepare($query);
        $bind_names[] = $bind_string;
        for ($i = 0; $i < count($params); $i++) {
            $bind_name = 'bind' . $i;
            $$bind_name = $params[$i];
            $bind_names[] = &$$bind_name;
        }
        call_user_func_array(array($statement, 'bind_param'), $bind_names);
        try {
            $statement->execute();
        } catch (Exception $e) {
            return new db_error(db_error::$ERROR_ON_EXECUTE);
        }
        return $statement;
    }
}

//$obj = new Connection();
//var_dump($obj->get_types());
