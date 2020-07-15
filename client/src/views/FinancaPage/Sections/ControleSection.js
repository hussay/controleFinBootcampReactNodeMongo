import React,{useState ,useEffect } from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui components
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, FormControlLabel, Switch} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';



// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//api//api
import * as api from "../../../api/apiService.js";


import styles from "assets/jss/material-kit-react/views/financaPageSections/controleStyle.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const useStyles = makeStyles(styles);


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function ControleSection() {
  const classes = useStyles();
  
  const [periodoEscolhido, setPeriodoEscolhido] = useState('');
  const [periodos, setPeriodos] = useState(['2019-01']);
  const [lancamentos, setLancamentos] = useState();
  const [buttonNext, setButtonNext] = useState('white');
  const [buttonBefore, setButtonBefore] = useState('white');
  const [resultados, setResultados] = useState();

  const toggleSwitch = (tipoLancamento) =>{
    return (<>
         <FormControlLabel
         control={
           <Switch
             checked={tipoModalCriar}
             onChange={event => setTipoModalCriar(event.target.checked)}
             value="receita"
             classes={{
               switchBase: classes.switchBase,
               checked: classes.switchChecked,
               thumb: classes.switchIcon,
               track: classes.switchBar
             }}
           />
         }
         classes={{
           label: classes.label
         }}
         label={tipoLancamento}
       />
 
       </>);
   };

  const [escolhaType, setEscolhaType] = useState(toggleSwitch("Despesa"));
  
  const [erro, setErro] = useState();
  const [msg, setMsg] = useState();
  const [todosLancamentos, setTodosLancamentos] = useState([]);

  
  const getLancamentos = async (periodoLancamentos) => {
      const apiLancamentos = await api.getLancamento(periodoLancamentos);
      setTodosLancamentos(apiLancamentos);
      criarCards(apiLancamentos);
  };

  const criarCards = (getlancamentos) =>{
    let qtdLancamentos = 0;
      let receitas = 0;
      let despesas = 0;
      getlancamentos.map((lancamento) => {
        qtdLancamentos++;
        
        if(lancamento.type === '-'){
          despesas += lancamento.value;
        }else{
          receitas += lancamento.value;
        }
        return true;
      });
      let saldo = receitas-despesas;

      let campoResultados = (
        <>
        <div className={classes.divLancamento}>
          Lançamentos: {qtdLancamentos} | Receita: {receitas} | Despesas: {despesas} | Saldo: {saldo}
        </div>
        <hr/>
        </>
      );
      setResultados(campoResultados);

      let novosDados = (
        <>
        {getlancamentos.map((option, index) => (
          
          <Card key={index} className={option.type === '-'  ? classes.cardrDespesa : classes.cardrReceita} style={{width: "20rem"}}>
            <CardHeader>
              <h3 className={classes.cardTitle}>{option.category}</h3>
            </CardHeader>
            <h6 className={classes.cardTitle}>{option.description}<br/>
            {option.yearMonthDay}</h6>
            <CardBody key={`cardbody${index}`}>
              
              <div className={classes.dadosLancamento}>
              <h2>R$ {option.value}</h2>
              </div>
              
            </CardBody>
            <CardFooter >
            <GridContainer alignItems="center">
                  <div>
                    <Button
                      color="transparent"
                      block
                      onClick={() => modalEditFuncao(option)}
                    >
                      <Icon>edit</Icon>
                    </Button>
                  </div>
            
                  <div>
                    <Button
                      color="transparent"
                      block
                      onClick={() => modalDeleteLancamento(option)}
                    >
                      <Icon>delete</Icon>
                    </Button>
                  </div>
            </GridContainer>
            </CardFooter>
          </Card>
          
        ))}
        </>
      );
      setLancamentos(novosDados);
     
  };

  const handleCorButton = (periodoLancamentos) =>{
      let periodoIndex = periodos.findIndex((periodo) => periodo === periodoLancamentos);
      if(periodoIndex === 0){
        setButtonBefore("white");
      }else{
        setButtonBefore("success");
      }
      if(periodos[periodoIndex+1]){
        setButtonNext("success");
      }else{
        setButtonNext("white");
      }
  }


  
  const [classicModal, setClassicModal] = useState(false);
  const [corpoModal, setCorpoModal] = useState("");
  const [tituloModal, setTituloModal] = useState(""); 
  const [valorModal, setValorModal] = useState(""); 
  const [categoriaModal, setCategoriaModal] = useState(""); 
  const [idModal, setIdModal] = useState(""); 
  const [tipoModalCriar, setTipoModalCriar] = useState(false); 
  const [tipoModal, setTipoModal] = useState(); 
  const [dataModal, setDataModal] = useState("2019-01-01"); 
  const [tipoEdicaoModal, setTipoEdicaoModal] = useState(1); 

  //const modalAlterarLancamento = ()=>{
   
     
    

   
  
  
  const modalEditFuncao = (evento) =>{
      setEscolhaType();
      setCorpoModal(evento.description);
      setTipoEdicaoModal(1);
      if(evento.type === '-'){
        setTituloModal("Despesa");
      }else{
        setTituloModal("Receita");
      }
      setValorModal(evento.value);
      setCategoriaModal(evento.category);
      setDataModal(evento.yearMonthDay);
      setIdModal(evento._id);
      setTipoModal(evento.type);
      setClassicModal(true);
      
  }

  const modalCriarFuncao = (evento) =>{
   
    setEscolhaType(toggleSwitch("Despesa"));
    setCorpoModal('');
    setTipoEdicaoModal(2);
    setTituloModal('Novo Lançamento');
    setErro();
    setValorModal(0);
    setCategoriaModal('');
    setDataModal('2019-01-01');
    setIdModal('');
    setTipoModal(tipoModal);
    setTipoModalCriar(false);
    setClassicModal(true);
    
}


  const handleChange = (event) => {
      let periodoLancamentos = event.target.value;
      handleCorButton(periodoLancamentos);
      getLancamentos(periodoLancamentos);
      setPeriodoEscolhido(periodoLancamentos);
  };
  const handlePeriodBefore = () => {
      let periodoIndex = periodos.findIndex((periodo) => periodo === periodoEscolhido);
     
      if(periodos[periodoIndex-1]){
        let periodoLancamentos = periodos[periodoIndex-1];
        handleCorButton(periodoLancamentos);
        getLancamentos(periodoLancamentos);
        setPeriodoEscolhido(periodoLancamentos);
      }
  };
  const handlePeriodNext = () => {
    let periodoIndex = periodos.findIndex((periodo) => periodo === periodoEscolhido);
   
    if(periodos[periodoIndex+1]){
      let periodoLancamentos = periodos[periodoIndex+1];
      handleCorButton(periodoLancamentos);
      getLancamentos(periodoLancamentos);
      setPeriodoEscolhido(periodoLancamentos);
    }
};

const handleInputDescription = (event) => {
  const newText = event.target.value;

  const filterLowerCase = newText.toLowerCase();
  

  const filteredLancamento = todosLancamentos.filter((lancamento) => {
    return lancamento.description.toLowerCase().includes(filterLowerCase);
  });
  criarCards(filteredLancamento);
  
};

  useEffect(() => {
    if(periodos.length === 1){
      const getPeriodosDistintos = async () => {
        const periodosDistintos = await api.getPeriodos();
        let novoPeriodo = [...periodosDistintos];
        setPeriodos(novoPeriodo);
      };
      getPeriodosDistintos();
    }
  });

  useEffect(() => {
    
    let tipoLancamento;
    if(tipoModalCriar){
      tipoLancamento = toggleSwitch("Receita");
    }else{
      tipoLancamento = toggleSwitch("Despesa");
    }
    setEscolhaType(tipoLancamento);
  },[tipoModalCriar]);

  


  


  const atualizaLancamento = async () => {
    let dadosBdLancamento = {
      idModal,
      tipoModal,
      categoriaModal,
      corpoModal,
      valorModal,
      dataModal,
    };

    const atualizaApi = await api.putLancamento(dadosBdLancamento);
    
    document.querySelector('#formatted-text-mask-input').value = "";
    let periodoLancamentos = periodoEscolhido;
    handleCorButton(periodoLancamentos);
    getLancamentos(periodoLancamentos);
    setPeriodoEscolhido(periodoLancamentos);
    setClassicModal(false);
};

const saveLancamento = async () => {
  
  const apiCriaLancamentos = await api.postLancamento(tipoModalCriar);
  
  if(!apiCriaLancamentos.erro){
    setPeriodoEscolhido(apiCriaLancamentos.yearMonth);
    let periodoLancamentos = apiCriaLancamentos.yearMonth;
    handleCorButton(periodoLancamentos);
    getLancamentos(periodoLancamentos);
    setPeriodoEscolhido(periodoLancamentos);
    setClassicModal(false);
    setErro();
    document.querySelector('#formatted-text-mask-input').value = "";
  }else{
    setErro();
    setTimeout(() => {
      setErro(
        <SnackbarContent
          message={
            <span>
              <b>Error:</b> Todos os Campos devem ser preenchidos.
            </span>
          }
          close
          color="danger"
          icon="info_outline"
        />
      );
    },2000);
  }
};

const modalDeleteLancamento = async (option) => {
  
  

  const DeleteApi = await api.deleteLancamento(option._id);
   
   let periodoLancamentos = option.yearMonth;
   handleCorButton(periodoLancamentos);
   getLancamentos(periodoLancamentos);
   setPeriodoEscolhido(periodoLancamentos);
   
   document.querySelector('#formatted-text-mask-input').value = "";
   setMsg();
    setTimeout(() => {
      setMsg(
        <SnackbarContent
          message={
            <span>
              Lançamento deletado com sucesso
            </span>
          }
          close
          color="success"
          icon="info_outline"
        />
      );
    },2000);
  // setClassicModal(false);
};




const manipulaLancamento = (tipoManipulacao)=>{
 
  if(tipoManipulacao === 1){
    atualizaLancamento();
  }else{
    saveLancamento();
  }
}

const modalLancamento = (
  <Dialog fullScreen open={classicModal} onClose={() => setClassicModal(false)} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={() => setClassicModal(false)} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.titles}>
                  {tituloModal}
                </Typography>
                <Button autoFocus color="success" onClick={() => manipulaLancamento(tipoEdicaoModal)}>
                  Salvar
                </Button>
              </Toolbar>
            </AppBar>
            <div className={classes.formModal}>
                {erro}
                {escolhaType}
                <CustomInput
                      labelText="Informe a Categoria"
                      id="categoria"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={
                        {
                          defaultValue:categoriaModal
                        }
                      }
                      
                    />
                <CustomInput
                      labelText="Informe a Descrição"
                      id="descricao"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={
                        {
                          defaultValue:corpoModal
                        }
                      }
                      
                    />
                <CustomInput
                      labelText="Informe o Valor"
                      id="valor"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={
                        {
                          defaultValue:valorModal
                        }
                      }
                      
                    />
                <FormControl fullWidth>
                      <Datetime  dateFormat="YYYY-MM-DD" timeFormat={false}
                        inputProps={{ placeholder: dataModal, id:"dataLancamento" }}
                      />
                </FormControl>
                    
            </div>
          </Dialog>
);
  

  
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Controle Financeiro</h2>
          
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer justify="center">
          <Button color={buttonBefore} className={classes.botaoMenor} onClick={handlePeriodBefore}>
            <Icon>navigate_before</Icon>
          </Button>
          <TextField
            id="standard-select-currency"
            select
            color="secondary"
            label="Periodo"
            value={periodoEscolhido}
            onChange={handleChange}
            helperText="Selecione o período para analisar"
          >
            {periodos.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button color={buttonNext} className={classes.botaoMenor} onClick={handlePeriodNext}>
            <Icon>navigate_next</Icon>
          </Button>
        </GridContainer>
      </div>
      <hr/>
            {resultados}
      <GridContainer justify="center">
          <Button color="success" onClick={modalCriarFuncao} >
            <Icon>add</Icon> NOVO LANÇAMENTO
          </Button>
          
          
          {modalLancamento}

          <TextField
            onChange={handleInputDescription}
            name="textmask"
            id="formatted-text-mask-input"
            fullWidth
            placeholder="Pesquise a descrição do Lançamento"
          />
          <br/><br/>
          
         
            
      </GridContainer>      
      <div>
        {msg}
        <GridContainer justify="center">
        {lancamentos}
        </GridContainer>
      </div>
    </div>
  );
}
