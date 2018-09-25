<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */
require_once 'helper.php';
require_once 'is_not_logged.php';

class register extends is_not_logged {

    private $username, $privacy, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('registerUsername');
        if(!$this->username)
            $this->json_error("Inserire partita iva");

        $this->privacy = isset($_POST['checkbox-register']);
        if(!$this->privacy)
            $this->json_error('Accettare il trattamento dei dati');
    }

    protected function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null){
            $pass = createRandomPassword(6);
            $folderName = getFolderName($info[1]);
            $passwordPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';
            if(file_exists($passwordPath)) {
                $this->json_error("Utente gia' registrato");
            }else{
                $passwordFile = fopen($passwordPath, 'w');
                var_dump($pass);
                var_dump(md5($pass));
                fputs($passwordFile, md5($pass));
                fclose($passwordFile);
                if(sendMail(PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml', $pass))
                    return;
                else
                    $this->json_error("Registrazione avvenuta! Impossibile inviare email, contattare l'assistenza per avere la pssword!");
            }
        }
        $this->json_error("Partita iva non trovata");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$register = new register();
$register->execute();