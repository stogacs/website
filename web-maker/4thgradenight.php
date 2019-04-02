<!DOCTYPE html>
<html>
    <head>
        <title>Build A Website</title>
    </head>
    
    <form action = "index.php" method = "post" id = "myform">
        <input type = "text"  value = "<?php echo $_POST['name'];  ?>"name = "name">
        <input type="submit"/>
    </form>
    
    <textarea form = "myform" name="code" style = "width:500px; height:600px;" > <?php echo $_POST['code'];  ?> </textarea>
    
   <?php
        $code = $_POST["code"];
        $name = $_POST["name"];
        if(isset($code) && isset($name)){
            $file = fopen("$name.html", "w");
            fwrite($file, $code);
            fclose($file);
            echo "<p>here is a </p><a href = '/$name.html' target='_blank'>link</a> <p> to your website!!!</p>";
        }
    ?>
    
</html>