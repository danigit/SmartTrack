<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 10:45 AM
 */

require_once 'is_not_logged.php';
require_once 'helper.php';

/**
 * Classe che effettua il login di un utente
 */
class login extends is_not_logged {
    private $username, $password, $id;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');

        if($this->username === "")
            $this->json_error('Username non valido');

        $this->password = $this->validate_string('password');

        if($this->password === "")
            $this->json_error('Inserire una password');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $this->id = $connection->login($this->username, $this->password);

        if(is_error($this->id))
            $this->json_error("Username o password non validi");

        set_session_variables($this->id, $this->username, true );
    }

    protected function get_returned_data(){
        $result = array();
        $result['username'] = $_SESSION['username'];
        $result['userid'] = get_user_id();

        return $result;
    }
}

$login = new login();
$login->execute();