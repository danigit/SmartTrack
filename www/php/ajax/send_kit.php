<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 27/09/18
 * Time: 17.02
 */
require_once 'helper.php';
require_once 'cs_interaction.php';

/**
 * Classe che segna un kit come inviato
 */
class send_kit extends cs_interaction {

    private $id, $result;

    protected function input_elaboration(){
        $this->json_error('antani');
        $this->id = $this->validate_string('id');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->send_kit($this->id);

        if(is_error($this->result))
            $this->json_error("Errore nel segnalare il kit cone spedito");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$send_kit = new send_kit();
$send_kit->execute();