<?php
/**
 * Created by IntelliJ IDEA.
 * User: simonabettoli
 * Date: 26/10/18
 * Time: 13:01
 */


require_once 'is_not_logged.php';
require_once 'helper.php';

/**
 * Classe che effettua il login di un utente
 */
class reset_password extends is_not_logged{
    private $username, $old, $new, $renew, $id;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');

//        var_dump('username' . $this->username);
        if ($this->username === "")
            $this->json_error('Inserire l\'username');

        $this->old = $this->validate_string('old');

        if ($this->old === "")
            $this->json_error('Inserire la password vecchia');

        $this->new = $this->validate_string('new');

        if ($this->new === "")
            $this->json_error('Inserire la nuova password');

        $this->renew = $this->validate_string('renew');

        if ($this->renew === "")
            $this->json_error('Reinserire la nuova password');

        if( $this->new !== $this->renew)
            $this->json_error("Le password non coincidono");
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $is_user = $connection->login($this->username, $this->old);

        if (is_error($is_user))
            $this->json_error('Credenziali sbagliate');

        $this->id = $connection->reset_password($this->username, $this->new);

        if (is_error($this->id))
            $this->json_error("Username o password non validi");
    }

    protected function get_returned_data(){
        return array('affected_rows' => $this->id);
    }
}

$reset_password = new reset_password();
$reset_password->execute();