import { title } from "assets/jss/material-kit-react.js";

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999"
  },
  cardrReceita: {
    backgroundColor: "#32ff7e",
    margin: "1px"
  },
  cardrDespesa: {
    backgroundColor: "#ff4d4d",
    margin: "1px"
  },
  dadosLancamento: {
    backgroundColor: "#FFF"
  },
  divLancamento: {
    backgroundColor: "#000"
  },
  botaoMenor:{
    padding: "5px",
    margin: "5px"
  },
  appBar: {
    position: 'relative',
  },
  titles: {
    flex: 1,
  },
  formModal:{
    padding: "20px",
  },
  modalOcultar: {
    display: "none",
  },
};

export default productStyle;
