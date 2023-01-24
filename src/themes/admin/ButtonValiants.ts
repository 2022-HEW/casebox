const ButtonValiant = {
 GlobalNav:{
    htmlColor: "#94A3B7",
    sx: {
      backgroundColor:"#324155",
      borderRadius: "50%",
      padding: "12px",
      fontSize: "45px",
      margin: "10px 10px -10px",
    },
  },
  Nav:{
    htmlColor: "#94A3B7",
    sx: {
      backgroundColor:"#CCE1FF",      
      borderRadius: "100px",
      width:"20vw",
      color:"#000",
      padding:"7px 0 7px 20px",
      "&:hover":{
        backgroundColor:"#CCE1FF"
      },
      justifyContent:"flex-start",
      fontSize:"11px"
    },
  }
} as const

export default ButtonValiant