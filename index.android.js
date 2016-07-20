import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';

import Button from 'react-native-button';

class NumberButton extends Component {
	_handlePress() {
		if (this.props.onPress) {
			this.props.onPress(this.props.number);
		}
	}

	render() {
		return (
			<Button
				containerStyle={{flex: 1, padding: 10, margin: 10, borderRadius: 4, justifyContent: 'space-around', backgroundColor: '#ccc'}}
				style={{fontSize: 20, color: 'black'}}
				onPress={() => this._handlePress()}>
				{this.props.number}
			</Button>
		);
	}
}

class OperationButton extends Component {
	_handlePress() {
		if (this.props.onPress) {
			this.props.onPress(this.props.symbol);
		}
	}

	render() {
		return (
			<Button
				containerStyle={{flex: 1, padding: 10, margin: 10, borderRadius: 4, justifyContent: 'space-around', backgroundColor: '#f00'}}
				style={{fontSize: 25, color: 'white'}}
				onPress={() => this._handlePress()}>
				{this.props.symbol}
			</Button>
		);
	}
}

function updateState(target, prop, value) {
	let res = Object.assign({}, target.state);
	if (arguments.length < 3) {
		prop(res);
	} else {
		res[prop] = value;
	}
	return target.setState(res);
}

var ops = {
	'+': (prev, value) => Number(prev) + Number(value),
	'-': (prev, value) => Number(prev) + Number(value),
	'*': (prev, value) => Number(prev) + Number(value),
	'/': (prev, value) => Number(prev) + Number(value)
};

class Calc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prev: null,
			value: null,
			op: null
		};
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
		updateState(this, 'value', val);
	}

	onOp(symbol) {
		if (this.state.value === null) {
			return;
		}
		if (this.state.op && this.state.prev !== null) {
			this.evaluate();
		} else {
			updateState(this, s => {
				s.prev = s.value;
				s.value = null;
			});
		}
		updateState(this, 'op', symbol);
	}

	evaluate() {
		let res = ops[this.state.op](this.state.prev, this.state.value);
		updateState(this, s => {
			s.prev = null;
			s.value = res;
			s.op = null;
		});
	}

	render() {
		let display = this.state.value || this.state.prev || '0';
		let onNumber = this.onNumber.bind(this);
		let onOp = this.onOp.bind(this);
		return (
			<View style={styles.container}>
				<View style={{flexDirection: 'row', alignItems: 'stretch', margin: 10}}>
					<Text style={[styles.display, {flex: 1}]}>{display}</Text>
					<Text style={[styles.display, {minWidth: 50}]}>{this.state.op}</Text>
				</View>
				<View style={{flex: 1, alignItems: 'stretch'}}>
					<View style={styles.buttonRow}>
						<NumberButton number="1" onPress={onNumber}/>
						<NumberButton number="2" onPress={onNumber}/>
						<NumberButton number="3" onPress={onNumber}/>
						<OperationButton symbol="+" onPress={onOp}/>
					</View>
					<View style={styles.buttonRow}>
						<NumberButton number="4" onPress={onNumber}/>
						<NumberButton number="5" onPress={onNumber}/>
						<NumberButton number="6" onPress={onNumber}/>
					</View>
					<View style={styles.buttonRow}>
						<NumberButton number="7" onPress={onNumber}/>
						<NumberButton number="8" onPress={onNumber}/>
						<NumberButton number="9" onPress={onNumber}/>
					</View>
					<View style={styles.buttonRow}>
						<NumberButton number="0" onPress={onNumber}/>
						<NumberButton number="." onPress={onNumber}/>
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
		justifyContent: 'space-around',
		alignItems: 'stretch'
	}
});

AppRegistry.registerComponent('Calc', () => Calc);
