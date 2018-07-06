<?php
/**
 * This file represents a class structure object hierarchy of
 * and INI file manager.  This set of object classes represent
 * an INI file by:<br>
 * <br>
 * ini_Comment - A comment inside the INI file<br>
 * ini_Value   - A key/value pair represented by key=value<br>
 * ini_Section - A section of an ini file represented by [section]<br>
 * ini_File    - A collection of ini_Section objects.<br>
 * <br>
 * Because reading a and parsing an INI file can take some time, you
 * should <i>not</i> read an parse a file every time a web page is called! PHP
 * does offer a solution!  Sessions.  To see how you can use this to your
 * advantage, Take a look at this example:<br>
 * <br>
 * @example testpage.php
 * <br><br>
 * The above example shows you how to parse and output the information.<br>
 * <br>
 * This is a work in progress and has not been used in a production mode
 * to manage INI files...yet.  Therefore, I am looking for feedback to extend
 * these objects to include methods that are needed to facilitate managing a
 * remote INI file from your browser.<br>
 * <br>
 * The basic purpose of this object was to read an INI file in only once and
 * perform a single action based on the settings in the INI file, not really
 * remote INI file editing.  But, let's have fun!<br>
 * <br>
 *
 * @version 0.9.0b
 * @author James Barwick <jbarwick@sentienthealth.com>
 * @package ini_File
 */
define('INI_VALUE_TERMINATOR', 1);
define('INI_NEWLINE',          2);
define('INI_COMMENT_CHARACTER',3);
define('INI_MSG_NOFILE',       4);
define('INI_MSG_NOWRITE',      6);
define('INI_MSG_CANTWRITE',    7);
define('INI_ROOTSECTION',      5);

$GLOBALS[INI_ROOTSECTION]="****root****";
$GLOBALS[INI_VALUE_TERMINATOR]="";
$GLOBALS[INI_NEWLINE]="\n";
$GLOBALS[INI_COMMENT_CHARACTER]=";";

$GLOBALS[INI_MSG_NOFILE]="File does not exist: ";
$GLOBALS[INI_MSG_NOWRITE]="Error writing file: ";
$GLOBALS[INI_MSG_CANTWRITE]="Cannot write to file: ";

/**
* ini_Comment
*
* Represent comments within the ini_File as an object.
*
* @author   James Barwick <jbarwick@sentienthealth.com>
* @package  ini_File
* @copyright (c) Copyright 2007.  James Barwick.  All rights reserved.
*/
class ini_Comment {
    /**
     * The comment is an array of strings
     * @var array()
     */
    private $comment;

    /**
     * Contructor
     *
     * Contruct the comment passing in at least one comment string
     *
     * @param string $comment
     * @return ini_Comment
     */
    function ini_Comment($comment) {
        $this->setComment($comment);
    }

    /**
     * setComment
     *
     * Set the comment to the string passed in
     *
     * @param string $comment
     * @access public
     */
    function setComment($comment) {
        $this->comment = array();
        $this->addComment($comment);
    }

    /**
     * addComment
     *
     * Append a comment line to the array() list of comments.
     *
     * @param string $comment
     * @access public
     */
    function addComment($comment) {
        $comment = ltrim($comment,"#,;");
        array_push($this->comment,$comment);
    }

    /**
     * createComment
     *
     * Append a comment to the end of the specified
     * comment object or create a new object.<br>
     * <br>
     * This is static so you can call it as:<br>
     * <br>
     * ini_Comment::createComment($c_obj,$comment);<br>
     *
     * @param  ini_Comment  $commentObject
     * @param  string       $comment
     * @return ini_Comment A new ini_Coment or the same one passed in
     * @access public
     */
    static function createComment($commentObject,$comment) {
        if (empty($commentObject)) {
            $commentObject = new ini_Comment($comment);
            return $commentObject;
        }
        if ($commentObject instanceof ini_Comment) {
            $commentObject->addComment($comment);
            return $commentObject;
        }
        return null;
    }

    /**
     * toString
     *
     * Return a formatted string representing the comment lines.<br>
     *<br>
     * The comment is preceeded by $GLOBALS[INI_COMMENT_CHARACTER]<br>
     *<br>
     * Each comment line is ended with $GLOBALS[INI_NEWLINE]<br>
     *
     * @param integer $line_1_indent
     * @param integer $line_2_indent
     * @return string representing the coments
     * @access public
     */
    function toString($line_1_indent=0,$line_2_indent=0) {
        $spaces = str_repeat(' ',$line_2_indent);
        $s=str_repeat(' ',$line_1_indent);
        $i=0;
        foreach ($this->comment as $comment_line) {
            if ($i==0) $i++; else $s.=$spaces;
            if (empty($comment_line)){
                $s.=$comment_line.$GLOBALS[INI_NEWLINE];
            }else{
                $s.=$GLOBALS[INI_COMMENT_CHARACTER].$comment_line.$GLOBALS[INI_NEWLINE];
            }
        }
        return $s;
    }

}

/**
* ini_Value
*
* @author   James Barwick <jbarwick@sentienthealth.com>
* @package  ini_File
* @copyright (c) Copyright 2007.  James Barwick.  All rights reserved.
*/
class ini_Value {

    /**
     * Comment for this value.  This value must start on the
     * same line as the key but may contain multple lines.<br>
     * <br>
     * Example:<br>
     * <br>
     * mykey=myvalue #comment<br>
     *               #comment line 2<br>
     *               #comment line 3<br>
     *
     * @var ini_Comment
     * @access private
     */
    private $after_comment;

    /**
     * Users sometimes put comments above a key value.  This
     * ini_Comment will be associated with with the key.
     * <br>
     * Example:<br>
     * <br>
     * #comment line 1<br>
     * #comment line 2<br>
     * key=value<br>
     *
     * @var ini_Comment
     * @access private
     */
    private $above_comment;

    /**
    * The KEY for the VALUE
    *
    * @var  string
    * @access private
    */
    private $name;

    /**
    * The VALUE for the KEY
    *
    * @var  string
    * @access private
    */
    private $content;

    /**
    * Constructor for ini_Value
    *
    * @param  string  $name       Name of value. This is called a Key
    * @param  string  $content    The value for the key
    * @param  string  $comment    The initial comment after the value
    * @param  mixed   $parent     Optional.  ini_Section
    * @access public
    */
    function ini_Value($name, $content, $comment='')
    {
        $this->name = $name;
        $this->content = $content;
        $this->above_comment = null;
        $this->after_comment = null;
        if ($comment!='')
            $this->addAfterComment($comment);
    } // end constructor

    /**
     * getName
     *
     * Get the key for this value.
     *
     * @return string
     * @access public
     */
    function getName() {
        return $this->name;
    }

    /**
     * setBeforeComments
     *
     * Set the comments to the ini_Comments object.<br>
     * <br>
     * If the parameter passed is not a ini_Comment object,
     * this function has no effect.
     *
     * @param ini_Comment $comments
     * @return ini_Comment The comment above the key
     * @access public
     */
    function setBeforeComments($comments) {
        if ($comments instanceof ini_Comment)
            $this->above_comment = $comments;

        return $this->above_comment;
    }

    /**
     * setBeforComment
     *
     * Set the comments above this key to the string identified.
     *
     * @param string $comment
     * @return ini_Comment The comment above the key
     * @access public
     */
    function setBeforeComment($comment) {
        $this->above_comment = new ini_Comment($comment);

        return $this->above_comment;
    }

    /**
     * getComment
     *
     * Returns the comment AFTER this key value entry.
     *
     * @return ini_Comment object
     * @access public
     */
    function getComment() {
        return $this->after_comment;
    }

    /**
     * addBeforeComment
     *
     * Add a comment above this value.
     *
     * @param string $comment
     * @return ini_Comment Instance of ini_Comment object or null
     * @access public
     */
    function addBeforeComment($comment)
    {
        if (empty($this->above_comment))
            $this->above_comment = new ini_Comment($comment);
        else
            $this->above_comment->setComment($comment);

        return $this->above_comment;
    }

    /**
    * addAfterComment
    *
    * Adds a comment to this item.
    *
    * @param  string $comment The comment to add to this value
    * @return ini_Comment reference to comment object
    * @access public
    */
    function addAfterComment($comment)
    {
        if (empty($this->after_comment))
            $this->after_comment = new ini_Comment($comment);
        else
            $this->after_comment->addComment($comment);

        return $this->after_comment;
    }

    /**
     * setAfterComment
     *
     *  Set the comments after this key to the comment provided.
     *
     * @param string $comment
     * @return ini_Comment
     * @access public
     */
    function setAfterComment($comment) {
        $this->after_comment = new ini_Comment($comment);

        return $this->after_comment;
    }

    /**
    * setContent
    *
    * Set the value for this key
    *
    * @param string $content
    * @access public
    */
    function setContent($content)
    {
        $this->content = $content;
    }

    /**
    * getContent
    *
    * Get the value for this key
    *
    * @return string vlaue for this key
    * @access public
    */
    function getContent()
    {
        return $this->content;
    }

    /**
    * toString
    *
    * Format the Value.<br>
    * <br>
    * This also includes the comments.
    *
    * @return string String representing the Value with its comments
    * @access public
    */
    function toString()
    {
        $s="";
        if (!empty($this->above_comment))
            $s.=$this->above_comment->toString();

        $v=$this->name."=".$this->content.$GLOBALS[INI_VALUE_TERMINATOR];
        $s.=$v;
        if (!empty($this->after_comment)) {
            $p = strlen($v)+1;
            $s.=$this->after_comment->toString(1,$p);
        }
        else
            $s.=$GLOBALS[INI_NEWLINE];

        return $s;
    }
}

/**
* ini_Section
*
* @author James Barwick <jbarwick@sentienthealth.com
* @package  ini_File
* @copyright (c) Copyright 2007.  James Barwick.  All rights reserved.
*/
class ini_Section {

    /**
    * Container object name
    * @var  string
    */
    private $name;

    /**
    * An array of values indexed by the value's key
    * @var  string
    */
    private $content;

    /**
     * Comment for this section
     * @var ini_Comment
     */
    private $comment;

    /**
    * Constructor
    *
    * @param  mixed   $parent     ini_File object.
    * @param  string  $name       Name of the INI Section
    * @param  string  $key        Name of the Attribute
    * @param  string  $content    Value of the Attribute
    * @access public
    */
    function ini_Section($name, $comment = '')
    {
        $this->name = $name;
        $this->content = array();
        $this->comment = null;
        if ($comment=='')
            $this->addComment($comment);
    } // end constructor

    /**
    * addItem
    *
    * Adds an item to this section.
    *
    * @param  string   $name      the key for the value
    * @param  string   $value     the value for the key
    * @param  string   $comment   Optional comment
    * @return ini_Value Value modified or created
    * @access public
    */
    function addItem($name,$value,$comment='')
    {
        $key = strtolower($name);

        if (IsSet($this->content[$key])) {
            $valueObject = $this->content[$key];
            $valueObject->setContent($value);
            $valueObject->setComment($comment);
        }
        else {
            $valueObject = new ini_Value($name,$value,$comment);
            $this->content[$key] = $valueObject;
        }

        return $valueObject;
    }

    /**
    * setComment
    *
    * Set the comment object on this section to the comment provided
    *
    * @param ini_Comment $commnet  This is the ini_Comment object
    * @access public
    */
    function setComment($comment) {
        if ($comment instanceof ini_Comment)
            $this->comment = $comment;
    }

    /**
    * addComment
    *
    * Adds a comment to this item.<Br>
    * This is a helper method that calls createItem
    *
    * @param string $comment The comment for this section
    * @return ini_Comment The comment object that was created.
    * @access public
    */
    function addComment($comment)
    {
        if (empty($this->comment))
                $this->comment = new ini_Comment($comment);
        else
                $this->comment->addComment($comment);

        return $this->comment;
    }

    /**
     * addValue
     *
     * Add the value to the Section
     *
     * @param ini_Value $value Value to add to this section
     * @access public
     */
    function addValue($value) {
        if ($value instanceof ini_Value) {
            $key = strtolower($value->getName());
            $this->content[$key]=$value;
        }
    }

    /**
    * getItem
    *
    * Gets an item from it's key.<br>
    * <br>
    * Examples:<br>
    * $value_object = $section->getItem('key');<br>
    * $value = $section->getItem('key')->getValue();<br>
    * $value = $inifile->getSection('section')->getItem('key')->getValue();<br>
    *
    * @param  string $name The key of the item in this section to retrieve
    * @return ini_Value The value referenced by this key
    * @access public
    */
    function getItem($name)
    {
        $key = strtolower($name);

        if (IsSet($this->content[$key]))
            return $this->content[$key];

        return null;
    }

    /**
     * getValues
     *
     * Return the values in this section in an associative array indexed by key.<br>
     *<br>
     * $values = array($key => new ini_Value($key,$value));<br>
     *
     * @return array() of ini_Value objects in an associative array indexed by key
     * @access public
     */
    function getValues() {
        return $this->content;
    }

    /**
    * getName
    *
    * Get this Section's name.
    *
    * @return string item's name
    * @access public
    */
    function getName()
    {
        return $this->name;
    }

    /**
    * toString
    *
    * Return a string representation of the section of the ini file.
    *
    * @return string Formatted section of the INI file.
    * @access public
    */
    function toString()
    {
        $s="";
        if (!empty($this->comment))
            $s.=$this->comment->toString();
        if ($this->name!=$GLOBALS[INI_ROOTSECTION])
            $s.="[".$this->name."]".$GLOBALS[INI_NEWLINE];
        foreach ($this->content as $value)
            $s.=$value->toString();
        return $s;
    }
}

/**
* ini_File
*
* This class allows for parsing and editing of ini files.
* This is meant to be streamlined and overhead elliminated.
*
* @author   James Barwick
* @package  ini_File
* @copyright (c) Copyright 2007.  James Barwick.  All rights reserved.
*/
class ini_File {

    /**
    * File name of the file to read/write to.
    *
    * @var string
    * @access private
    */
    private $filename;

    /**
    * ini_Section list.  This is an associative array indexed by
    * the sections name.
    * <br>
    * Example:<br>
    * <br>
    * $sections = array($key => new ini_Section($key,$value);
    *
    * @var array() of ini_Section objects
    * @access private
    */
    private $sections;

    /**
    * Constructor
    *
    * Creates a holder for the ini_File contents.
    *
    * @param string $filename
    * @access public
    */
    function ini_File($filename)
    {
        $this->filename = $filename;
        $this->sections = array();
    }

    /**
    * getSections
    *
    * Get the list of sections.  There is always at least one section
    * called $GLOBALS[INI_ROOTSECTION].  This section may be empty.
    *
    * @return array() An associative array of sections in the file.
    * @access public
    */
    function getSections() {
        return $this->sections;
    }

    /**
     * getSection
     *
     * Get the section object ini_Section from its name.
     *
     * @param string $section Name or key of the section to get
     * @return ini_Section
     * @access public
     */
    function getSection($section) {
        $section = strtolower($section);

        if (IsSet($this->sections[$section])) {
            return $this->sections[$section];
        }
        return null;
    }

    /**
     * getItem
     *
     * Retrieve the value from the section.  Use empty string '' for the section name
     * if the value isn't in a section.
     *
     * @param string $section name of the section to retrieve the value
     * @param string $name    name of the value to retreive
     * @return ini_Value      value identified by the name in the specified section
     * @access public
     */
    function getItem($section,$name) {
        $section_Object = $this->getSection($section);

        if (empty($section_Object))
            return null;

        return $section_Object->getItem($name);
    }

    /**
     * getItemValue
     *
     * Get the Value of the item in the specified section
     *
     * @param string $section Section name in the file
     * @param string $name value name in the file
     * @return string the value of the key
     * @access public
     */
    function getItemValue($section,$name) {
        $value_object = $this->getItem($section,$name);

        if (empty($value_object))
            return '';

        return $value_object->getContent();
    }

    /**
    * read
    *
    * arses the data of the given configuration file
    * @return string representing an error code or empty string if no error
    * @access public
    */
    function read() {

        if (!file_exists($this->filename))
            return $GLOBALS[INI_MSG_NOFILE].$this->filename;

        $lines = file($this->filename);

        $this->parse($lines);

        return "";
    }

    /**
     * write
     *
     * Write ini contents to the file
     *
     * @return string representing an error code or empty string if no error
     * @access public
     */
    function write() {
        $result = "";

        if (!is_writable($this->filename))
            return $GLOBALS[INI_MSG_CANTWRITE].$this->filename;

        $fl=fopen($this->filename,"w");
        if (fputs($fl,$this->toString())===false) {
            $result = $GLOBALS[INI_MSG_NOWRITE].$this->filename;
        }
        fclose($fl);

        return $result;
    }

    /**
     * createSection
     *
     * Adds the section or replaces the section specified.
     *
     * @param string $name
     * @return ini_Section
     * @access public
     */
    function createSection($name) {
        $key = trim(strtolower($name));
        $s = new ini_Section($name);
        $this->sections[$key] = $s;

        return $s;
    }

    /**
     * parse
     *
     * Parse an array() of INI File Lines
     *
     * @access public
     * @param string array() $lines
     */
    function parse($lines) {

        $this->sections = array();

        $currentSection = $this->createSection($GLOBALS[INI_ROOTSECTION]);
        $currentValue   = null;
        $currentComment = null;

        foreach ($lines as $line) {

            if (($line=='')||($line[0]=='\t')||($line[0]==' '))
               $beginsWithSpaces=true;
            else
               $beginsWithSpaces=false;

            $line=trim($line,"\x00..\x20");

            if ($line=='') {
                $currentComment=ini_Comment::createComment($currentComment,$line);
                continue;
            }

            if ($line[0]==$GLOBALS[INI_COMMENT_CHARACTER]) {
                if ($beginsWithSpaces) {
                    if (!empty($currentValue)) {
                        $currentValue->addAfterComment($line);
                        $currentComment=null;
                        continue;
                    }
                }
                $currentComment=ini_Comment::createComment($currentComment,$line);
                continue;
            }

            // Are we a section? if it begins with [ assume it is regardless
            // of an ending ].  Result, fix bad INI section headers.
            if ($line[0]=='[') {
                $l=strlen(($line))-1;
                if ($line[$l]==']') $l--;
                $name = substr($line,1,$l);

                $currentSection=$this->createSection($name);
                $currentSection->setComment($currentComment);
                $currentComment=null;
                continue;
            }

            // Check for key
            $i=strpos($line,'=');
            if ($i==0) {
                $currentComment=ini_Comment::createComment($currentComment,$line);
                continue;
            }

            $key=trim(substr($line,0,$i));
            $line_length=strlen($line);
            $inquote=false;
            $value_start = $i+1;
            $value_end = $value_start;
            while ($value_end<$line_length)
            {
                $c=$line[$value_end];
                if ($c=='"')
                {
                    if (!$inquote)
                        $inquote=true;
                    else
                        $inquote=false;
                }
                if (!$inquote) {
                    if (($c==';')||($c=='#'))
                      break;
                }
                $value_end++;
            }

            $value=substr($line,$value_start,$value_end-$value_start);

            if ($value_end<$line_length)
                $comment=ltrim(substr($line,$value_end+1),"#,\x20");
            else
                $comment="";

            $currentValue=$currentSection->addItem($key,$value,$comment);

            if (!empty($currentComment)) {
                $currentValue->setBeforeComments($currentComment);
                $currentComment=null;
            }
        }
    }

    /**
    * tpString
    *
    * Returns a formatted string of the file
    *
    * @return string
    * @access public
    */
    function toString()
    {
        $s="";
        foreach ($this->sections as $section) {
            $s.=$section->toString();
        }
        return trim($s);
    }
}
?>
