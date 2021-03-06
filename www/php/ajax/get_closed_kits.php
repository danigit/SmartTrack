<?php
/**
 * Created by IntelliJ IDEA.
 * User: simonabettoli
 * Date: 23/10/18
 * Time: 15:51
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class get_closed_kits extends cs_interaction{
    private $from, $to, $result;

    protected function input_elaboration(){
        $this->from = $this->validate_string('from');

        if($this->from === false)
            $this->json_error('Inserire la data di inizio intervallo');

        $this->to = $this->validate_string('to');

        if($this->to === false)
            $this->json_error('Inserire la data di fine intervallo');
    }

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_closed_kits($this->from, $this->to);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_all_kits = new get_closed_kits();
$get_all_kits->execute();