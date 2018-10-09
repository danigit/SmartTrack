<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 09/10/18
 * Time: 1.22
 */


require_once 'helper.php';
require_once 'cs_interaction.php';

class update_type extends cs_interaction {
    private $value, $id, $result;

    protected function input_elaboration(){
        $this->value = $this->validate_string('value');

        if(!$this->value)
            $this->json_error('Inserisci un tipo');

        $this->id = $this->validate_string('id');

        if(!$this->id)
            $this->json_error('Impossibile recuperare l\'id');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->update_type($this->id, $this->value);

        if(is_error($this->result))
            $this->json_error("Impossibile salvare il tipo");
    }

    protected function get_returned_data(){
        return array('rows' => $this->result);
    }
}

$update_type = new update_type();
$update_type->execute();