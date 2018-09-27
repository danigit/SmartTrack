<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 27/09/18
 * Time: 13.09
 */

require_once 'cs_interaction.php';
require_once 'helper.php';


class recover_kit extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->recover_kit();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit aperti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$recover_kit = new recover_kit();
$recover_kit->execute();