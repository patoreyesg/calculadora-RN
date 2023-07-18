import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../themes/AppTheme';
import {BotonCalc} from '../components/BotonCalc';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const CalculadoraScreen = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    // No aceptar mas de un punto
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
        //Evita si es otro cero y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
        //Evita si es diferente de cero y no tiene punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
        //Evita numero 0000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };
  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const borrarUltimo = () => {
    let negativo = '';
    let numeroTemp = numero;

    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.substring(1);
    }
    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const cambiarNumeroPorAnterior = () => {
    numero.endsWith('.')
      ? setNumeroAnterior(numero.slice(0, -1))
      : setNumeroAnterior(numero);

    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };
  const btnMultiplicar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const btnSumar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };
  const btnRestar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const calcular = () => {
    const numero1 = Number(numero);
    const numero2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${numero1 + numero2}`);
        break;
      case Operadores.restar:
        setNumero(`${numero2 - numero1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${numero1 * numero2}`);
        break;
      case Operadores.dividir:
        setNumero(`${numero2 / numero1}`);
        break;

      default:
        break;
    }
    setNumeroAnterior('0');
  };

  return (
    <View style={styles.calculadoraContainer}>
      {numeroAnterior !== '0' && (
        <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      )}

      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
        <BotonCalc texto="del" color="#9B9B9B" accion={borrarUltimo} />
        <BotonCalc texto="/" color="#FF9427" accion={btnDividir} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armarNumero} />
        <BotonCalc texto="8" accion={armarNumero} />
        <BotonCalc texto="9" accion={armarNumero} />
        <BotonCalc texto="x" color="#FF9427" accion={btnMultiplicar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armarNumero} />
        <BotonCalc texto="5" accion={armarNumero} />
        <BotonCalc texto="6" accion={armarNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={btnRestar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armarNumero} />
        <BotonCalc texto="2" accion={armarNumero} />
        <BotonCalc texto="3" accion={armarNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={btnSumar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armarNumero} />
        <BotonCalc texto="." accion={armarNumero} />
        <BotonCalc texto="=" color="#FF9427" accion={calcular} />
      </View>
    </View>
  );
};
