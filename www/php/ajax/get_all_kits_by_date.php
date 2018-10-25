<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 24/10/18
 * Time: 23.20
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class get_all_kits_by_date extends cs_interaction{
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
        $this->result = $connection->get_all_kits_by_date($this->from, $this->to);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_all_kits_by_date = new get_all_kits_by_date();
$get_all_kits_by_date->execute();