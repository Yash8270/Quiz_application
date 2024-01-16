// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var mail;
var express = require('express');
var router = express.Router();
var user;
var database = require('../database');
const nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express', session : req.session });
});

router.get('/signin', function(req,res,next){
    res.render('index',{title: 'Express', session: req.session});
});

router.get('/apply',(req,res)=>{
    res.render('exam_application',{title : 'Express',session : req.session});
});

router.get('/physics',(req,res)=>{
    res.render('Physics',{title: 'Express',session : req.session});
});

router.get('/chemistry',(req,res)=>{
    res.render('Chemistry',{title: 'Express',session : req.session});
});

router.get('/biology',(req,res)=>{
    res.render('Biology',{title: 'Express',session : req.session});
});

router.get('/cprogram',(req,res)=>{
    res.render('C_Program',{title: 'Express',session : req.session});
});

router.get('/maths',(req,res)=>{
    res.render('Maths',{title: 'Express',session : req.session});
});

router.get('/english',(req,res)=>{
    res.render('English',{title: 'Express',session : req.session});
});

router.post('/phyquiz', (req, res) => {
  const { score, submissionTime } = req.body;
  console.log(req.body);

  const insertQuery = 'INSERT INTO applies (userid, subject, total, marks, time) VALUES (?, ?, ?, ?, ?)';
  // const selectQuery = 'SELECT * FROM applies WHERE userid=?';

  database.query(insertQuery, [user, 'Physics', 30, score, submissionTime], (err, quizR) => {
      if (err) {
          console.error('Database insertion error:', err.message);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.redirect('/history');
      });
      }
    );

    router.post('/chemquiz', (req, res) => {
      const { score, submissionTime } = req.body;
      console.log(req.body);
    
      const insertQuery = 'INSERT INTO applies (userid, subject, total, marks, time) VALUES (?, ?, ?, ?, ?)';
      // const selectQuery = 'SELECT * FROM applies WHERE userid=?';
    
      database.query(insertQuery, [user, 'Chemistry', 30, score, submissionTime], (err, quizR) => {
          if (err) {
              console.error('Database insertion error:', err.message);
              return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.redirect('/history');
          });
          }
        );

        router.post('/bioquiz', (req, res) => {
          const { score, submissionTime } = req.body;
          console.log(req.body);
        
          const insertQuery = 'INSERT INTO applies (userid, subject, total, marks, time) VALUES (?, ?, ?, ?, ?)';
          // const selectQuery = 'SELECT * FROM applies WHERE userid=?';
        
          database.query(insertQuery, [user, 'Biology', 30, score, submissionTime], (err, quizR) => {
              if (err) {
                  console.error('Database insertion error:', err.message);
                  return res.status(500).json({ error: 'Internal Server Error' });
              }
              res.redirect('/history');
              });
              }
            );  

            router.post('/cquiz', (req, res) => {
              const { score, submissionTime } = req.body;
              console.log(req.body);
            
              const insertQuery = 'INSERT INTO applies (userid, subject, total, marks, time) VALUES (?, ?, ?, ?, ?)';
              // const selectQuery = 'SELECT * FROM applies WHERE userid=?';
            
              database.query(insertQuery, [user, 'C-Program', 30, score, submissionTime], (err, quizR) => {
                  if (err) {
                      console.error('Database insertion error:', err.message);
                      return res.status(500).json({ error: 'Internal Server Error' });
                  }
                  res.redirect('/history');
                  });
                  }
                );  
                
                router.post('/engquiz', (req, res) => {
                  const { score, submissionTime } = req.body;
                  console.log(req.body);
                
                  const insertQuery = 'INSERT INTO applies (userid, subject, total, marks, time) VALUES (?, ?, ?, ?, ?)';
                  // const selectQuery = 'SELECT * FROM applies WHERE userid=?';
                
                  database.query(insertQuery, [user, 'English', 30, score, submissionTime], (err, quizR) => {
                      if (err) {
                          console.error('Database insertion error:', err.message);
                          return res.status(500).json({ error: 'Internal Server Error' });
                      }
                      res.redirect('/history');
                      });
                      }
                    );      
  
  // });

  router.get('/history', (req,res) => {
    const selectQuery = 'SELECT * FROM applies WHERE userid=?';
    database.query(selectQuery, [user], (err, results) => {
        if (err) {
            console.error('Database query error:', err.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(results[0].userid);
        // res.render('Maths');
        // res.redirect('/login');
        res.render('history.ejs', {quizData: results });
      });
  });




router.post('/submit', (req, res) => {
    const {name,age,email,userid,password } = req.body;
    sendWelcomeEmail(email,'Thank you for signing in to our website. We appreciate your presence!',);
    const query = 'INSERT INTO sinfo (name, age, email, userid, password) VALUES (?, ?, ?, ?, ?)';
    database.query(query, [name,age,email,userid,password], (err, results) => {
        if (err) {
            // res.session.message("Cannot insert...already exists.");
            console.error('Database insertion error:', err.message);
        } else {
            res.render('history', { quizData: ['','','','',''] });
            user=userid;
        }
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Replace 'users' with your actual table name
    const query = 'SELECT userid,password FROM sinfo WHERE userid = ? AND password = ?';
  
    database.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Database query error:', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length > 0) {
      
        const query = 'SELECT * FROM applies WHERE userid = ?';

     database.query(query,[username],(err, results) => {
    if (err) {
      console.error('Database query error:', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.render('history', { quizData: results });
    user=username;
  });
      } else {
        // Authentication failed
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  });


// Configure nodemailer with your Gmail account
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    user: 'yashlimbachiya900@gmail.com',
    pass: 'fkddgdwvfroxyjam',
  },
  tls : { rejectUnauthorized: false }
});


function sendWelcomeEmail(userEmail, answer) {
  const mailOptions = {
    from: 'yashlimbachiya900@gmail.com',
    to: userEmail,
    subject: 'Welcome to our Website!',
    html: answer,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

router.get('/forgot-password', (req,res) => {
    res.render('password');
});

router.post('/reset-password', (req, res) => {
  const email = req.body.email;
  const id = req.body.userid;
  // const id = 'Yash8270';
  console.log(email);
  const test= `<p>Hello,</p>  <p>Please click on the following link to reset your password:</p>  <a href="http://localhost:3000/change">Reset Password</a>`;
  const ver = 'SELECT * FROM sinfo WHERE email = ? AND userid=?';

  database.query(ver, [email,id], (err,results) => {
    console.log(results);
    if(err)
    {
      res.send('error');
    }
    if(results.length > 0)
    {
      console.log('hi'); 
      sendWelcomeEmail(email,test);
      res.send('Email has been sent for reseting the password');
      mail=email;
      user=id;
    }
    else
    {
      console.log('no');
    }

  });

});

router.get('/change', (req,res) => {
  res.render('change');
});

router.post('/complete', (req,res) => {
  const mod = 'UPDATE sinfo SET password = ? WHERE email = ?';
  const p = req.body.password;
  database.query(mod, [p,mail],(err, results) => {
    if(err)
    {
      console.log("cannot update");
      return;
    }
    res.redirect('/login2');
    
  });
});

router.get('/login2', (req,res) => {
  const query = 'SELECT * FROM applies WHERE userid = (SELECT userid FROM sinfo WHERE email=?)';

  database.query(query,[mail],(err, results) => {
 if (err) {
   console.error('Database query error:', err.stack);
   res.status(500).json({ error: 'Internal Server Error' });
   return;
 }
 if(results.length > 0)
{
 res.render('history', { quizData: results });
 user=results[0].userid;
}
else{
  res.render('history', {quizData: ['','','','','']});
}
});
   });
// router.post('/submit', (req, res) => {
  
//   const userEmail = req.body.email;
//   console.log(userEmail);
//   sendWelcomeEmail(userEmail);

//   // Send response to the client
//   res.send('Sign-in successful');
// });


router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;