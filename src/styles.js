import Colors from './colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	mt5: { marginLeft: 5 },
	mt10: { marginLeft: 10 },
	ml5: { marginLeft: 5 },
	mr5: { marginRight: 5 },
	ml10: { marginLeft: 10 },
	mr10: { marginRight: 10 },
	mb10: { marginBottom: 10 },
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
	touchGreen: {
		backgroundColor: Colors.green
	},
	touchRed: {
		backgroundColor: Colors.red
	},
	touchBrightRed: {
		backgroundColor: Colors.brightRed
	},
	touchText: {
		fontSize: 20,
		textAlign: 'center'
	},
	touchTextBlack: {
		color: Colors.black
	},
	touchTextWhite: {
		color: Colors.white
	},
	textInputContainer: {
		padding: 5,
		borderBottomWidth: 1,
		borderColor: Colors.black,
		marginBottom: 50
	},
	textInput: {
		fontSize: 25
	},
	textBig: {
		fontSize: 40
	},
	textMedium: {
		fontSize: 30
	},
	textSmall: {
		fontSize: 15
	},
	containerMiddle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})