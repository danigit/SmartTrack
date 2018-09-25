<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:39 AM
 */


define('FORWARDSLASH', '/');
require_once "../db/db_error.php";


function is_error($value){
    return is_a($value, "db_error");
}

function json_result($values)
{
    $output = ob_get_contents();
    ob_end_clean();
    $values["phperrors"] = $output;

    $values = $this->escape_array($values);

    echo json_encode($values);

    die();
}

/**
 * Invia una risposta json di errore con messaggio msg
 * @param string $msg message to display to the user
 * @param int $error_code
 *  1 utente non loggato
 *  2 utente loggato non admin
 */
function json_error($msg, $error_code = 0)
{
    $obj = array();
    $obj["result"] = false;
    $obj["message"] = $msg;
    $obj["code"] = $error_code;

    $this->json_result($obj);
}

/**
 * Escape ricorsivo di tutti gli elementi nell'array che non sono ne interi
 * ne booleani
 * @param $var mixed
 * @return array|mixed
 */

function escape_array($var)
{
    if (is_numeric($var) || is_bool($var))
        return $var;

    if (!is_array($var))
        return htmlspecialchars($var, ENT_QUOTES, "UTF-8");

    if (is_array($var))
        foreach ($var as $key => $value)
            $var[$key] = escape_array($value);

    return $var;
}



function get_user_id()
{
    return $_SESSION['id'];
}


function set_session_variables($id, $username, $is_secure)
{
    session_start();
    session_regenerate_id();
    $_SESSION = array();
    $_SESSION['username'] = $username;
    $_SESSION['id'] = $id;
    $_SESSION['secure'] = $is_secure;
    session_write_close();
}



