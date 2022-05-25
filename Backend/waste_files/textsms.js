const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "d44c8360",
    apiSecret: "eMgW1AAzjFJahYtg"
})

const from = "MyHelpersSMSAPI"
const to = "917433947774"
const text = 'My Helpers Login OTP is :: ' + Math.floor(100000 + Math.random() * 900000) + '   '

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })


// const [showpswd, setshowpswd] = useState({
//     showPassword: false
// })
// const handleClickShowPassword = () => {
//     setshowpswd({ showPassword: !showpswd.showPassword });
// };


    // < Grid xs = { 12} sm = { 12} item >
    //     <TextField
    //         fullWidth
    //         sx={{ marginTop: 2 }}
    //         required
    //         variant='outlined'
    //         label="Password"
    //         id="outlined-adornment-password"
    //         type={showpswd.showPassword ? 'text' : 'password'}
    //         value={values.password}
    //         onChange={(val) => { setValues({ ...values, password: val.target.value }) }}
    //         InputProps={{
    //             endAdornment: (
    //                 <InputAdornment position="end">
    //                     <IconButton
    //                         aria-label="toggle password visibility"
    //                         onClick={handleClickShowPassword}
    //                         onMouseDown={handleMouseDownPassword}
    //                         edge="end"
    //                     >
    //                         {showpswd.showPassword ? <Visibility /> : <VisibilityOff />}
    //                     </IconButton>
    //                 </InputAdornment>
    //             )
    //         }}

    //     />
    //                             </Grid >
    //                         </Grid >
    // <Grid xs={12} sm={12} item>
    //     <Button type='submit' variant="contained" color="warning" fullWidth sx={{ height: 50, marginTop: 3 }}>
    //         Login
    //     </Button>

    // </Grid>