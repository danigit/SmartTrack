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
    const PATH = 'localhost', USERNAME = 'root', PASSWORD = 'password', DATABASE = 'test';
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

    function test(){
        $query = "SELECT * FROM testTable";

        $result = $this->connection->query($query);

        if ($result === false )
            return new db_error(db_error::$ERROR_GET_ARTICLES);

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('test1' => $row['test1'], 'test2' => htmlspecialchars($row['test2']));
        }

        return $result_array;
    }


//    function login( $email, $password ){
//        $query = "SELECT user_id, password FROM users WHERE email=? ";
//        $statement = $this->parse_and_execute_select($query, "s", $email);
//        if ($statement instanceof DbError)
//            return $statement;
//        $statement->bind_result($res_user_id, $res_pass);
//        $fetch = $statement->fetch();
//        $statement->close();
//        if ($fetch && password_verify($password, $res_pass)) {
//            return $res_user_id;
//        }
//        return new DbError(DbError::$ERROR_ON_LOGIN);
//    }
//    function get_username_by_id($id){
//        $query = "SELECT email FROM users WHERE user_id=?";
//        var_dump($statement = $this->parse_and_execute_select($query, "i", $id));
//        if ($statement instanceof DbError)
//            return $statement;
//        $statement->bind_result($res_username);
//        $fetch = $statement->fetch();
//        $statement->close();
//        if ($fetch) {
//            return $res_username;
//        }
//        return new DbError(DbError::$ERROR_ON_GETTING_EMAIL);
//    }
//    function register($email, $password)
//    {
//        $query = 'INSERT INTO users (email, password) VALUES (?, ?)';
//        $result = $this->parse_and_execute_insert($query, "ss", $email,  $password);
//        if ($result instanceof DbError) {
//            return $result;
//        } else if ($result) {
//            return $this->connection->insert_id;
//        }
//        return new DbError(DbError::$ERROR_ON_REGISTER);
//    }
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
//    function get_all_articles(){
//        $query = "SELECT type, name, description, file_path, images_path FROM articles";
//        $result = $this->connection->query($query);
//        if ($result === false )
//            return new DbError(DbError::$ERROR_GET_ARTICLES);
//        $result_array = array();
//        //todo da mettere dove serve htmlspecialchars
//        while ($row = mysqli_fetch_assoc($result)) {
//            $result_array[] = array('type' => $row['type'], 'title' => htmlspecialchars($row['name']), "description" => $row['description'], "images_path" => $row['images_path'], "file_path" => $row['file_path']);
//        }
//        return $result_array;
//    }
//    /**
//     * Metodo che seleziona l'errore da ritornare in funzione dell'array passato come parametro
//     * @param string $errors - array contenente gli ultimi errori generati
//     * @return DbError - l'errore associato alla coloonna che lo ha generato
//     */
//    function parse_error($errors)
//    {
//        if ($errors['errno'] === 1062) {
//            $column = $this->parse_string($errors['error']);
//            if ($column === "'email'")
//                return new DbError(DbError::$EMAIL_ALREADY_REGISTERED);
//        } //else if ($errors['errno'] === 1452)
//        //return new DbError(DbError::$FOREIGN_KEY_ERROR);
//        return new DbError(DbError::$ERROR_ON_EXECUTE);
//    }
//    /**
//     * Metodo che seleziona il nome della colonna che ha generato l'errore
//     * @param $error_string - la stringa contenente il nome della colonna
//     * @return string - il nome della colonna che ha generato l'errore
//     */
//    function parse_string($error_string)
//    {
//        $split_error = explode(' ', $error_string);
//        return end($split_error);
//    }
//    /**
//     * Metodo che prepara la query, fa il bind dei parametri e la esegue, viene chiamata principalmente per le insert
//     * @param string $query - la query da eseguire
//     * @param string $bind_string - la stringa con il tipo degli argomenti da passare al metodo bind
//     * @param array ...$params - array con i parametri da passare al bind
//     * @return bool|DbError ERROR_ON_EXECUTE - se viene generato un errore in fase di esecuzione della query
//     *                      - il risultato della execute altrimenti
//     */
//    function parse_and_execute_insert($query, $bind_string, ...$params)
//    {
//        $statement = $this->connection->prepare($query);
//        $bind_names[] = $bind_string;
//        for ($i = 0; $i < count($params); $i++) {
//            $bind_name = 'bind' . $i;
//            $$bind_name = $params[$i];
//            $bind_names[] = &$$bind_name;
//        }
//        call_user_func_array(array($statement, 'bind_param'), $bind_names);
//        try {
//            $result = $statement->execute();
//            if ($result === false) {
//                return $this->parse_error($statement->error_list[0]);
//            }
//        } catch (Exception $e) {
//            return new DbError(DbError::$ERROR_ON_EXECUTE);
//        }
//        $statement->close();
//        return $result;
//    }
//    /**
//     * Metodo che prepara la query, fa il bind dei parametri e la esegue, viene chiamata principalmente per le select, update e delete
//     * @param string $query - la query da eseguire
//     * @param string $bind_string - la stringa con il tipo degli argomenti da passare al metodo bind
//     * @param array ...$params - array con i parametri da passare al bind
//     * @return DbError|mysqli_stmt ERROR_ON_EXECUTE - se viene generato un errore in fase di esecuzione della query
//     *                             - lo statement ritornato dal metodo prepare()
//     */
//    function parse_and_execute_select($query, $bind_string, ...$params)
//    {
//        $statement = $this->connection->prepare($query);
//        $bind_names[] = $bind_string;
//        for ($i = 0; $i < count($params); $i++) {
//            $bind_name = 'bind' . $i;
//            $$bind_name = $params[$i];
//            $bind_names[] = &$$bind_name;
//        }
//        call_user_func_array(array($statement, 'bind_param'), $bind_names);
//        try {
//            $statement->execute();
//        } catch (Exception $e) {
//            return new DbError(DbError::$ERROR_ON_EXECUTE);
//        }
//        return $statement;
//    }
}

//$obj = new Connection();
//var_dump($obj->test());
//var_dump($obj->get_article_by_title('EMDR: LE 8 FASI DEL TRATTAMENTO'));
//var_dump($obj->insert_article("dani", "danii", "antani", 'stuzica', "scapelli", 2, 3, 4));
//echo "" . $obj->login("ds.acconto@gmail.com", "dani");
//echo "" . $obj->get_username_by_id(4);
//var_dump($obj->get_username_by_id(1));
//$array = array("antani", "scapelli", "stuzica", "come se fosse");
//var_dump($obj->get_all_articles());
