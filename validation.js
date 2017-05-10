
$(function() {
    localStorage.setItem('a','a');


    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element)
        || value.length >= 8
        && /\d/.test(value)
        && /[a-z]/i.test(value);
    }, 'Your password must be at least 8 characters long and contain at least one number and one char\'.');

    $.validator.addMethod('userIsOk', function(value, element) {
        var username=$("#username2").val();
        var user = localStorage.getItem(username);
        if(user==="undefined" || user===null){
            return false;
        }
        else{
            return true;
        }
    }, 'user not exsist');

    $.validator.addMethod('passwordIsOk', function(value, element) {
        var password=$("#password2").val();
        var username=$("#username2").val();
        var pass = localStorage.getItem(username);
        if(pass===password){
            return true;
        }
        else{
            return false;
        }
    }, 'passowrd is encorect');

    function logIsOk(){
        var loginform=document.getElementById('login');
        var proppage = document.getElementById('gameProperties');
        loginform.style.display ='none';
        proppage.style.display ='block';
    }
    //save user in memory
    function save(username,password){
        if (typeof(Storage) !== "undefined") {
            var user= localStorage.getItem(username);
            if(user ==="undefined" || user === null){
                localStorage.setItem(username, password);
                alert("Registration Ended Sucsseful , Enjoy the Game")
                var signinform=document.getElementById('registration');
                var welcomepage=document.getElementById('welcome');

                signinform.style.display='none';
                welcomepage.style.display='block';
            }
            else{
                alert("username already exists choose another");
            }
        } else {
            document.getElementById("result").innerHTML = "your browser does not support Web Storage";
        }
    }


    $("form[name='registrationForm']").validate({
        rules: {
            firstname: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            lastname: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                strongPassword: true
            }
        },
        // Specify validation error messages
        messages: {
            firstname:{
                required: "Please enter your firstname",
                nowhitespace: "No whote spaces",
                lettersonly:"letters only"
            },
            lastname:{
                required: "Please enter your last name",
                nowhitespace: "No whote spaces",
                lettersonly:"letters only"
            },
            password: {
                required: "Please provide a password",
            },
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            var text = $('#DynamicValueAssignedHere').find('input[name="username"]').val();

            var username=$("#username1").val();
            var password=$("#password1").val();
            save(username,password);
            form.submit();
        }
    });


    $("form[name='loginForm']").validate({
        rules: {
            username: {
                required: true,
                userIsOk: true,

            },
            password: {
                required: true,
                passwordIsOk: true
            }
        },
        // Specify validation error messages
        messages: {
            username:{
                required: "Please enter your username",
                nowhitespace: "user not exsist",
            },
            password: {
                required: "Please provide a password",
            },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {

            logIsOk();
        }
    });

});

