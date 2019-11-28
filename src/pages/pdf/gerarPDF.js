import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white'
  },
  title:{
    margin: 30,
    fontSize: 24,
    textAlign: 'center'
  },
  subTitle:{
      fontSize: 16,
      marginLeft: 15
  },
  data:{
      fontSize: 14,
      marginLeft: 20,
      marginBottom:5
  }
});

// Create Document Component
// export const MyDocument = (dados) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

export default class GerarPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: this.props.location.state.dados
    }
  }

  render() {
    return (
      <PDFViewer width="50%" height="700" style={styles.view}>
        {/* <MyDocument busca={this.state.busca}/> */}
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.title}>
              <Text> Relatório de projetos </Text>
            </View>
            {/* {this.state.busca.map(b =>
              <View>
                <Text style={styles.subTitle}> Nome do Projeto</Text>
                <Text style={styles.data}>{b.nome}</Text>

                <Text style={styles.subTitle}> Descrição do Projeto</Text>
                <Text style={styles.data}>{b.descricao}</Text>

                <Text style={styles.subTitle}> Data Final do Projeto</Text>
                <Text style={styles.data}>{(b.data_final).split("T")[0].split("-").reverse().join("/")}</Text>

                <Text style={styles.subTitle}> Departamento </Text>
                <Text style={styles.data}>{b.titulo}</Text>
                <Text>---------------------------------------------------------------------------------------------------------------------</Text>
              </View>
            )} */}
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}