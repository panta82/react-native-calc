import React, {Component} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Platform
} from 'react-native';

import {
	RedButton,
	GrayButton,
	BlueButton
} from './buttons';

var ops = {
	'+': (prev, value) => Number(prev) + Number(value),
	'-': (prev, value) => Number(prev) - Number(value),
	'*': (prev, value) => Number(prev) * Number(value),
	'/': (prev, value) => Number(prev) / Number(value)
};

function initialState() {
	return {
		prev: null,
		value: null,
		op: null
	};
}

export default class Calc extends Component {
	constructor(props) {
		super(props);
		this.state = initialState();
	}

	reset() {
		this.setState(initialState());
	}

	onNumber(number) {
		let val = this.state.value;
		if (number === '.') {
			if (val === null) {
				val = '0.';
			}
			else if (val.indexOf('.') < 0) {
				val += '.';
			}
		}
		else if (val !== null || number != 0) {
			val = (val || '') + String(number);
		}
		this.setState({
			value: val
		});
	}

	canEvaluate() {
		return this.state.op && this.state.prev !== null;
	}

	doEvaluate() {
		return ops[this.state.op](this.state.prev, this.state.value)
	}

	onOp(symbol) {
		if (this.state.value === null && this.state.prev === null) {
			return;
		}
		var s = {
			op: symbol
		};
		if (this.canEvaluate()) {
			s.prev = this.doEvaluate();
		}
		else if (this.state.value !== null) {
			s.prev = this.state.value;
		}
		s.value = null;
		this.setState(s);
	}

	onEvaluate() {
		if (this.canEvaluate()) {
			this.setState({
				prev: this.doEvaluate(),
				value: null,
				op: null
			});
		}
	}

	onSign() {
		if (this.state.value !== null) {
			this.setState({
				value: Number(this.state.value) * -1
			});
		}
	}

	render() {
		let display = this.state.value || this.state.prev || '0';
		let onNumber = this.onNumber.bind(this);
		let onReset = this.reset.bind(this);
		let onEvaluate = this.onEvaluate.bind(this);
		let onOp = this.onOp.bind(this);
		let onSign = this.onSign.bind(this);
		return (
			<View style={styles.container}>
				<View style={{flexDirection: 'row', alignItems: 'stretch', margin: 10}}>
					<Text style={[styles.display, {flex: 1}]}>{display}</Text>
					<Text style={[styles.display, {minWidth: 50}]}>{this.state.op}</Text>
				</View>
				<View style={{flex: 1, alignItems: 'stretch'}}>
					<View style={styles.buttonRow}>
						<RedButton symbol="C" onPress={onReset} flex={3}/>
						<BlueButton symbol="+" onPress={onOp}/>
					</View>
					<View style={styles.buttonRow}>
						<GrayButton symbol="1" onPress={onNumber}/>
						<GrayButton symbol="2" onPress={onNumber}/>
						<GrayButton symbol="3" onPress={onNumber}/>
						<BlueButton symbol="-" onPress={onOp}/>
					</View>
					<View style={styles.buttonRow}>
						<GrayButton symbol="4" onPress={onNumber}/>
						<GrayButton symbol="5" onPress={onNumber}/>
						<GrayButton symbol="6" onPress={onNumber}/>
						<BlueButton symbol="*" onPress={onOp}/>
					</View>
					<View style={styles.buttonRow}>
						<GrayButton symbol="7" onPress={onNumber}/>
						<GrayButton symbol="8" onPress={onNumber}/>
						<GrayButton symbol="9" onPress={onNumber}/>
						<BlueButton symbol="/" onPress={onOp}/>
					</View>
					<View style={styles.buttonRow}>
						<GrayButton symbol="+/-" onPress={onSign}/>
						<GrayButton symbol="0" onPress={onNumber}/>
						<GrayButton symbol="." onPress={onNumber}/>
						<RedButton symbol="=" onPress={onEvaluate}/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		flexDirection: 'column',
		backgroundColor: '#333',
		paddingTop: Platform.OS === 'ios' ? 20 : 0
	},
	display: {
		fontSize: 25,
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: '#8e8',
		padding: 10
	},
	buttonRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch'
	}
});