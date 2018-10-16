<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 27/09/18
 * Time: 18.04
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

/**
 * Classe che gestisce la chiusura di un kit
 */
class close_kit extends cs_interaction {

    private $id, $result;

    protected function input_elaboration(){
        $this->id = $this->validate_string('id');
        if($this->id === false){
            $this->json_error('Impossibile recuperare l\'id');
        }
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->close_kit($this->id);

        if(is_error($this->result))
            $this->json_error("Errore nella chiusuro del kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$close_kit = new close_kit();
$close_kit->execute();