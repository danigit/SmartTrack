<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:09 PM
 */

class db_error{

    public static $ERROR_ON_EXECUTE                 = 1;
    public static $ERROR_ON_LOGIN                   = 2;
    public static $ERROR_ON_REGISTER                = 3;
    public static $EMAIL_ALREADY_REGISTERED         = 4;
    public static $ERROR_ON_GETTING_EMAIL           = 5;
    public static $ERROR_ON_GET_TYPES          = 6;
    public static $ERROR_GET_ARTICLES               = 7;
    public static $ERROR_ON_GETTING_THE_ARTICLE     = 8;
    public static $INSERT_EDIT_ARTICLE              = 18;
    public static $UPDATE_ARTICLE_ERROR             = 19;
    public static $WRONG_NUMBER_OF_PARAMETERS       = 32;

    private $error;

    public function __construct($error){
        $this->error = $error;
    }

    public function getError(){
        return $this->error;
    }

    public function getErrorName(){
        switch ($this->error){
            case 1: return "ERROR_ON_EXECUTE";
            case 2: return "DUPLICATE_USERNAME";
            case 3: return "DUPLICATE_EMAIL";
            case 4: return "REGISTER_FAILED";
            case 5: return "LOGIN_FAILED";
            case 6: return "EMAIL_ERROR";
            case 7: return "USER_ERROR";
            case 8: return "COOKIE_ERROR";
            case 9: return "COOKIE_USER_ERROR";
            case 10: return "SET_PASSWORD_ERROR";
            case 11: return "SET_NAME_SURNAME_ERROR";
            case 12: return "GET_USER_FORGOT_KEY_ERROR";
            case 13: return "GET_USER_EMAIL_ERROR";
            case 14: return "GET_USERNAME_ERROR";
            case 15: return "DUPLICATE_PASSWORD_KEY";
            case 16: return "DUPLICATE_COOKIE_KEY";
            case 17: return "GET_USER_BY_EMAIL_ERROR";
            case 18: return "INSERT_EDIT_USER_ERROR";
            case 19: return "UPDATE_USER_ERROR";
            case 20: return "ADD_SEGNALATION_ERROR";
            case 21: return "ERROR_GET_CATEGORIES";
            case 22: return "ERROR_GET_SEGNALATION";
            case 23: return "SAVE_MESSAGGE_ERROR";
            case 24: return "ERROR_ON_MARK_AS_SOLVED";
            case 25: return "ERROR_ON_MARK_AS_UNSOLVED";
            case 26: return "ERROR_ON_GET_MESSAGE";
            case 27: return "ERROR_ON_UPDATE_CHAT_OPENED";
            case 28: return "ERROR_ON_DELETE_COOKIE";
            case 29: return "ERROR_GET_LAST_TEN_SEGNALATIONS";
            case 30: return "DUPLICATE_SOLVED";
            case 31: return "DUPLICATE_UNSOLVED";
            case 32: return "WRONG_NUMBER_OF_PARAMETERS";
            case 33: return "ERROR_ON_GET_USERS";
            case 34: return "ERROR_ON_BAN_USER";
            case 35: return "ERROR_ON_UNBAN_USER";
            case 36: return "ERROR_ON_IS_ADMIN";
            case 37: return "ERROR_ON_GET_USER_PRIVILEGES";
            case 38: return "FOREIGN_KEY_ERROR";
            case 39: return "DELETE_COOKIE_ERROR";
            case 40: return "ERROR_ON_GET_USER_PROFILE";
            default: return null;
        }
    }
}

