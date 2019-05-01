import Colors from './colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	mb20: { marginBottom: 20 },
	touch: {
		padding: 20,
		paddingLeft: 80,
		paddingRight: 80,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.black
	},
	touchBlack: {
		backgroundColor: Colors.black
	},
	touchWhite: {
		backgroundColor: Colors.white
	},
	touchText: {
		fontSize: 20,
	},
	touchTextBlack: {
		color: Colors.black,
	},
	touchTextWhite: {
		color: Colors.white,
	}
})