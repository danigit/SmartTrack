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

    /**
     * Funzione che effettua il login
     * @param $email
     * @param $password
     * @return db_error|mysqli_stmt
     */
    function login( $email, $password ){

        $query = "SELECT user_id, password FROM users WHERE email=? ";
        $statement = $this->parse_and_execute_select($query, "s", $email);

        if ($statement instanceof db_error)
            return $statement;

        if($statement === false){
            return new db_error(db_error::$ERROR_ON_LOGIN);
        }

        $statement->bind_result($res_user_id, $res_pass);
        $fetch = $statement->fetch();

        $statement->close();

        if ($fetch && password_verify($password, $res_pass)) {
            return $res_user_id;
        }

        return new db_error(db_error::$ERROR_ON_LOGIN);
    }

    /**
     * Funzione che registra un nuovo utente
     * @param $email - l'email dell'utente
     * @param $password - la password dell'utente
     * @return bool|db_error|mixed
     */
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

    /**
     * Funzione che recupera tutti i kit aperti
     * @return array|db_error - l'array dei kit recuperati oppure un errore
     */
    function get_open_kits(){
        $query = "SELECT kit_id, description, is_sent, creation_date FROM kit WHERE closing_date IS NULL";
        $result = $this->connection->query($query);

        if ($result === false )
            return new db_error(db_error::$ERROR_ON_GETTING_KIT);

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('kit_id' => $row['kit_id'], "description" => $row['description'], "is_sent" => $row['is_sent'],
                "creation_date" => date('d/m/Y', strtotime($row['creation_date'])), "spedisci" => $row['kit_id'],
                "chiudi" => $row['kit_id']);
        }

        $result->close();

        return $result_array;
    }

    /**
     * Funzione che recupera tutte le tipologie degli oggetti
     * @return array|db_error
     */
    function get_types(){
        $query = "SELECT DISTINCT obj_type FROM object";

        $result = $this->connection->query($query);

        if ($result === false )
            return new db_error(db_error::$ERROR_ON_GET_TYPES);

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('type' => $row['obj_type']);
        }

        $result->close();

        return $result_array;
    }

    /**
     * Funzione che recupera gli oggetti del tipo passato come parametro
     * @param $type - il tipo degli oggetti da recuperare
     * @return array|db_error|mysqli_stmt - l'array degli oggetti recuperati o un errore
     */
    function get_objects_by_type($type){
        $query = "SELECT cod, name FROM object WHERE obj_type=? AND kit_id IS NULL";
        $statement = $this->parse_and_execute_select($query, "s", $type);

        if ($statement instanceof db_error)
            return $statement;

        if($statement === false){
            return new db_error(db_error::$ERROR_ON_GETTING_OBJECTS);
        }

        $result = $statement->get_result();
        $result_array = array();

        while ($row = $result->fetch_array()) {
            $result_array[] = array("cod" => $row['cod'], "name" => $row['name']);
        }

        $statement->close();

        return $result_array;
    }

    /**
     * Funzione che recupera gli oggetti del kit passato come parametro
     * @param $id - l'id del kit al quale gli oggetti apartengano
     * @return array|db_error|mysqli_stmt - l'array degli oggetti recuperati o un errore
     */
    function get_objects_by_kit($id){
        $query = "SELECT cod, obj_type, name FROM object WHERE kit_id=?";
        $statement = $this->parse_and_execute_select($query, "s", $id);

        if ($statement instanceof db_error)
            return $statement;

        if($statement === false){
            return new db_error(db_error::$ERROR_ON_GETTING_OBJECTS);
        }

        $result = $statement->get_result();
        $result_array = array();

        while ($row = $result->fetch_array()) {
            $result_array[] = array("cod" => $row['cod'], "obj_type" => $row['obj_type'], "name" => $row['name'], "id" => $id);
        }

        $statement->close();

        return $result_array;
    }

    /**
     * Funzione che crea un nuovo kit inserendolo nella tabella kit
     * @param $description - la descrizione del kit
     * @param $data - gli altri campi del kit
     * @return mixed - l'id del kit inserito oppure un errore
     */
    function create_kit($description, $data){

        $this->connection->autocommit(false);
        $errors = array();

        $now_date = date('Y-m-d H:i:s');
        var_dump($now_date);
        $query = "INSERT INTO kit (description, creation_date) VALUES (?, '$now_date')";
        $resultInsert = $this->parse_and_execute_insert($query, "s", $description);


        if($resultInsert === false){
            array_push($errors, 'insert');
        }

        $id = $this->connection->insert_id;

        //TODO fo schifo usare join (forse)
        foreach ($data as $datum) {
            $query = "UPDATE object SET kit_id = ? WHERE cod = ?";
            $resultUpdate = $this->parse_and_execute_select($query, "ii", $id, $datum);

            if($resultUpdate == false){
                array_push($errors, 'update');
            }
        }

        if(!empty($errors)){
            $this->connection->rollback();
            return new db_error(db_error::$ERROR_ON_CREATING_KIT);
        }

        $this->connection->commit();

        return $errors;
    }

    /**
     * Funzione che sospende un kit
     * @param $data - i dati del kit da sospendere
     * @return int | db_error
     */
    function suspend_kit($data){

        $this->connection->autocommit(false);
        $errors = array();
        //TODO fa schifo usare join (forse)
        foreach ($data as $datum) {
            $query = 'INSERT INTO suspended_kit (object_id) VALUES (?)';
            $resultInsert = $this->parse_and_execute_insert($query, "s", $datum);


            if($resultInsert == false){
                array_push($errors, 'insert');
            }
        }

        if(!empty($errors)){
            $this->connection->rollback();
            return new db_error(db_error::$ERROR_ON_SUSPENDING_KIT);
        }

        $this->connection->commit();

        return $this->connection->affected_rows;
    }

    /**
     * Funzione che recupera un kit sospeso in precedenza
     * @return array|db_error - il kit sospesso in precedenza oppure un errore
     */
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
            return new db_error(db_error::$ERROR_ON_RECOVERING_KIT);
        }else {

            $this->connection->commit();

            $result_array = array();

            while ($row = mysqli_fetch_assoc($result)) {
                $result_array[] = array('name' => $row['name'], 'cod' => $row['cod']);
            }

            return $result_array;
        }
    }

    /**
     * Funzione che controlla se c'e un kit da recuperare, controllando se c'e' almeno una riga
     * nella tabella suspended_kit
     * @return bool|db_error|mysqli_result - il risultato della query oppure un errore
     */
    function control_recover_kit(){
        $query = "SELECT * FROM suspended_kit LIMIT 1";

        $result = $this->connection->query($query);

        if($result->num_rows == 0)
            return new db_error(db_error::$ERROR_ON_CONTROLLING_RECOVER_KIT);

        return $result->num_rows;
    }

    /**
     * Funzione che segna un kit come spedito
     * @param $id - l'id del kit spedito
     * @return db_error|int|mysqli_stmt -
     */
    function send_kit($id){
        $query = "UPDATE kit SET is_sent = TRUE WHERE kit_id = ?";
        $resultUpdate = $this->parse_and_execute_select($query, "i", $id);

        if($resultUpdate instanceof db_error){
            return $resultUpdate;
        }else if($resultUpdate === false)
            return new db_error(db_error::$UPDATE_ARTICLE_ERROR);

        return $this->connection->affected_rows;
    }

    /**
     * Funzione che chiude un kit aggiurnando il campo closing date della tabella kit inserendo la data corrente
     * @param $id - l'id del kit da chiudere
     * @return db_error|int - il valore restituito in caso di errore o di successo
     */
    function close_kit($id){
        $query = "UPDATE kit SET closing_date = now() WHERE kit_id = ?";

        $resultUpdate = $this->parse_and_execute_select($query, "i", $id);

        if($resultUpdate instanceof db_error)
            return $resultUpdate;

        if($resultUpdate === false)
            return new db_error(db_error::$ERROR_ON_CLOSING_KIT);

        return $this->connection->affected_rows;
    }

    /**
     * Funzione che recupera tutti i kit
     * @return array|db_error - l'array contenente i kit oppure un errore
     */
    function get_all_kits(){
        $query = "SELECT kit_id, description, creation_date, closing_date FROM kit";

        $result = $this->connection->query($query);

        if ($result === false )
            return new db_error(db_error::$ERROR_ON_GETTING_KIT);

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('kit_id' => $row['kit_id'], "description" => $row['description'],
                "creation_date" => date('d/m/Y', strtotime($row['creation_date'])), "closing_date" => $row['closing_date'],);
        }

        $result->close();

        return $result_array;
    }

    function close_kit_and_save($kit_id, $data){
        $this->connection->autocommit(false);
        $errors = array();

        $query = "UPDATE kit SET closing_date = now() WHERE kit_id = ?";

        $resultUpdate = $this->parse_and_execute_select($query, "i", $kit_id);

        if($resultUpdate === false){
            array_push($errors, 'update');
        }


        foreach ($data as $datum) {
            $query = 'INSERT INTO incomplete_kit (kit_id, object_id) VALUES (?, ?)';
            $resultInsert = $this->parse_and_execute_insert($query, "ss", $kit_id, $datum);

            if($resultInsert == false){
                array_push($errors, 'insert');
            }
        }

        $query = "UPDATE object LEFT JOIN `incomplete_kit` ON object.cod=incomplete_kit.object_id  
                  SET object.kit_id = NULL
                  WHERE incomplete_kit.object_id IS NULL AND object.kit_id = ?";

        $resultUpdateObjects = $this->parse_and_execute_select($query, "i", $kit_id);

        if($resultUpdateObjects === false){
            array_push($errors, 'update');
        }

        if(!empty($errors)){
            $this->connection->rollback();
            return new db_error(db_error::$ERROR_ON_CLOSING_KIT);
        }

        $this->connection->commit();

        return $this->connection->affected_rows;
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
//var_dump($obj->create_kit('kitn', [1, 3, 4]));