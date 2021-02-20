import React from "react";
import avatar from "assets/img/faces/login.jpg";
import ip from "variables/ip";
class AvatarClass extends React.Component {
    state={
      avatar64: null
    }
    constructor(props){
      super(props)
      this.state={
        avatar64: avatar
      }
      this.getAvatar(props.idEmpleado)
    }
    getAvatar = async (idUsuario) => {
      try {
        const sendUri = ip("3019")+'getAvatar';
        //const sendUri = "http://34.66.54.10:3019/";
        //const sendUri = "http://localhost:3019/";
        //const sendUri = "http://192.168.1.74:3012/";
        const bodyJSON = {
          idUsuario
        };
        const response = await fetch(sendUri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyJSON)
        });
        const responseJson = await response.json().then(r => {
          //console.log(`Response1: ${r}`)
          if (
            r[0] !== undefined &&
            (`${r[0].idUsuario}` === `${idUsuario}`)
          ) {
            if (r[0].avatar64 !== null) {
              this.setState({avatar64: r[0].avatar64})
              //state.avatar64 = r[0].avatar64
             // console.log(state.avatar64)
            }
          }
        });
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    render(){
      const {avatar64} = this.state
      return(<img id='avatarProfile' src={avatar64} alt="Foto de perfil" />)
    }
  }

  export default AvatarClass