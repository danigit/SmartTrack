<?php
/**
 * Developer: Daniel Surpanu
 */


require_once 'helper.php';
require_once 'cs_interaction.php';

class insert_type extends cs_interaction {
    private $type, $id;

    protected function input_elaboration(){
        $this->type = $this->validate_string('type');

        if($this->type === false)
            $this->json_error('Inserisci una tipologia');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $this->id = $connection->insert_type($this->type);

        if(is_error($this->id)) {
            if ($this->id->getErrorName() === 'TYPE_ALREADY_INSERTED')
                $this->json_error('Tipologia già presente');

            $this->json_error("Impossibile salvare la tipologia");
        }
    }

    protected function get_returned_data(){
        return array();
    }
}

$insert_type = new insert_type();
$insert_type->execute();