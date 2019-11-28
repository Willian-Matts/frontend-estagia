import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white'
  },
  title: {
    margin: 30,
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    margin: 10,
    marginLeft: 15,
    fontSize: 14,
  },
  subTitle: {
    fontSize: 16,
    marginLeft: 15
  },
  view: {
    marginLeft: 190
  },
  image: {
    margin: 10,
    marginBottom: 1,
    marginLeft: 200,
    width: 200,
    height: 60
  },
  imageRodape:{
    margin: 475,
    marginBottom: 1,
    marginLeft: 278,
    width: 60,
    height: 100
  },
  data: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5
  }
});

export default class GerarPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: this.props.location.state.dados
    }
  }

  render() {
    return (
      <PDFViewer width="90%" height="700" style={styles.view}>
        {/* <MyDocument busca={this.state.busca}/> */}
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.image} >
              <Image src="https://www.ifgoiano.edu.br/home/images/CER/Logotipos/Logotipo.png"></Image>
            </View>
            <View style={styles.title}>
              <Text> Termo de Conclusão de Estágio </Text>
            </View>
            <View>
              <Text style={styles.text}>Por meio deste documento é declarado o termino do processo de estágio do(a) aluno(a) {this.state.dados.nome_aluno} realizado na empresa {this.state.dados.nome_empresa} onde se iniciou as atividades na data de {this.state.dados.data_inicio_estagio} é foi finalizado na data de {this.state.dados.data_final_estagio} supervisionado(a) por {this.state.dados.nome_supervisor}. Foram realizadas {this.state.dados.horas_diarias_estagio} horas diárias completando {this.state.dados.horas_semanais_estagio} horas semanais dando um total de {this.state.dados.horas_totais_estagio} horas de estágio.  </Text>
            </View>
            <View style={styles.imageRodape} >
              <Image src="https://www.ifgoiano.edu.br/home/images/REITORIA/Imagens/2017/Untitled-2.png"></Image>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}