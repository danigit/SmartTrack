<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 28/09/18
 * Time: 12.29
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

/**
 * Classe che gestisce la chiusura di un kit
 */
class close_kit_and_save extends cs_interaction {

    private $count, $kit_id, $data, $result;

    protected function input_elaboration(){
        $this->count = $this->validate_string('count');
        $this->kit_id = $this->validate_string('kit_id');

        for($i = 0; $i < $this->count; $i++){
            $this->data[] = $this->validate_string($i);
        }
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->close_kit_and_save($this->kit_id, $this->data);

        if(is_error($this->result))
            $this->json_error("Errore nella chiusuro del kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$close_kit_and_save = new close_kit_and_save();
$close_kit_and_save->execute();