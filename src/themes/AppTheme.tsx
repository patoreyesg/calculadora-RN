import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'black',
  },
  calculadoraContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  resultado: {
    color: 'white',
    fontSize: 50,
    textAlign: 'right',
  },
  resultadoPequeno: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 30,
    textAlign: 'right',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  boton: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  botonColorDefault: {
    backgroundColor: '#333333',
  },
  botonColorNaranja: {
    backgroundColor: '#FF9427',
  },
  botonColorDGrisOscuro: {
    backgroundColor: '#2D2D2D',
  },
  botonTexto: {
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    color: 'white',
  },
});
