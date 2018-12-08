<?php

require_once '../db/db.php';

/**
 * Classe astratta che gestisce l'interrazione tra il client e server
 */
abstract class cs_interaction
{
    private $connection;

    function __construct(){
        if(!isset($_SESSION))
            session_start();
        session_write_close();
        ob_start();
    }


    /**
     * Funzione che crea una connessione al database
     * @return Connection - la connessione appena creata
     */
    protected function get_connection(){
        if(!isset($this->connection))
            $this->connection = new Connection();

        return $this->connection;
    }

    /**
     * Funzione che esegue i principali metodi nell'interrazione con il client
     */
    function execute(){
        $this->input_elaboration();
        $this->get_db_informations();
        $this->json_success();
    }

    abstract protected function input_elaboration();
    abstract protected function get_db_informations();
    abstract protected function get_returned_data();


    /**
     * Funzione che ritorna il risultato al client in formato json
     * @param $result - il risultato in formanto json
     */
    protected function json_result($result){
        $res = ob_get_contents();
        ob_end_clean();

        $result['phperrors'] = $res;

        $result = $this->escape_array($result);

        echo json_encode($result);
        die();
    }

    /**
     * Funzione che fa l'escape dei caratteri speciali html
     * @param $result - la stringa controllata
     * @return array|string
     */
    private static function escape_array($result){
        if (is_numeric($result) || is_bool($result))
            return $result;

        if (!is_array($result))
            return htmlspecialchars($result, ENT_QUOTES, "UTF-8");

        if (is_array($result))
            foreach ($result as $key => $value)
                $result[$key] = cs_interaction::escape_array($value);

        return $result;
    }

    /**
     * Funzione che segnala che la chiamata ha avuto successo e il risultato e' valido
     */
    function json_success(){
        $result = $this->get_returned_data();
        $result['result'] = true;
        $this->json_result($result);
    }

    /**
     * Funzione che segnala che la chiamata ha avuto successo ma il risultato non e' valido
     */
    function json_error($message, $code = 0){
        $result = array();
        $result["result"] = false;
        $result["message"] = $message;
        $result["code"] = $code;

        $this->json_result($result);
    }

    /**
     * Funzione che recupera i parametri in post
     * @param $name - nome parametro
     * @param bool $default
     * @return bool|string - il valore del parametro o false
     */
    function validate_string($name, $default = false){
        if (isset($_POST[$name])) {
            var_dump('is set');
            return trim($_POST[$name]);
        }
        return $default;
    }
}