import React, {Component} from 'react';

import {
	View
} from 'react-native';

import Button from 'react-native-button';

export class CalcButton extends Component {
	_handlePress() {
		if (this.props.onPress) {
			this.props.onPress(this.props.symbol);
		}
	}

	render() {
		let flex = this.props.flex !== undefined ? this.props.flex : 1;
		return (
			<View style={{flex: flex}}>
				<Button
					containerStyle={[
						{
							flex: 1,
							margin: 10,
							borderRadius: 4,
							justifyContent: 'space-around',
							backgroundColor: this.props.bg
						},
						this.props.containerStyle
					]}
					style={[
						{fontSize: 20, color: this.props.fg},
						this.props.style
					]}
					onPress={() => this._handlePress()}>
					{this.props.symbol}
				</Button>
			</View>
		);
	}
}

export class GrayButton extends Component {
	render() {
		return <CalcButton {...this.props} fg="black" bg="#ccc" />;
	}
}

export class BlueButton extends Component {
	render() {
		return <CalcButton {...this.props} fg="black" bg="#bad8d9"/>;
	}
}

export class RedButton extends Component {
	render() {
		return <CalcButton {...this.props} fg="white" bg="#f00" />;
	}
}