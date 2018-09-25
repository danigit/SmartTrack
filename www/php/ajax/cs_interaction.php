<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 10:16 AM
 */

abstract class cs_interaction{
    private $connection;

    function __construct(){
        if(!isset($_SESSION))
            session_start();
        session_write_close();
        ob_start();
    }

    /**
     * Funzione che si connecte al database
     */
    protected function get_connection(){
        //codice da implementare se si prendono i dati da un database
    }

    abstract protected function input_elaboration();
    abstract protected function get_informations();
    abstract protected function get_returned_data();

    /**
     * Funzione che ellabora la richiesta in tre step: ellabora input, reccupera dati, ritorna dati
     */
    function execute(){
        $this->input_elaboration();
        $this->get_informations();
        $this->json_success();
    }

    /**
     * Funzione che ritorna il risultato codificato in json
     * @param $result - il valore da mandare come json
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
     * Funzione che controlla e pulisce il risultato
     * @param $result - il valore da controllare
     * @return array|string - il valore pulito
     */
    private static function escape_array($result){
        if(!is_array($result))
            return htmlspecialchars($result);

        if(is_array($result))
            foreach ($result as $key => $value)
                $result[$key] = cs_interaction::escape_array($value);

        return $result;
    }

    /**
     * Funzione che ritorna il risultato se la chiamata ha avuto successo
     */
    function json_success(){
        $result = $this->get_returned_data();
        $result['result'] = true;
        $this->json_result($result);
    }

    /**
     * Funzine che ritorna un messaggio di errore se la chiamato non ha avuto successo
     * @param $message - il messaggio da ritornare
     * @param int $code - il codice di errore
     */
    function json_error($message, $code = 0){
        $result = array();
        $result['result'] = false;
        $result['message'] = $message;
        $result['code'] = $code;

        $this->json_result($result);
    }


    function validate_string($name, $default = false){
        if(isset($_POST[$name]))
            return trim($_POST[$name]);
        return $default;
    }
}