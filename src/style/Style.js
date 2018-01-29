import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	navbar: {
		backgroundColor: '#c64e4f'
	},
	text: {
		flex: 1,
		fontSize: 18,
		color: '#ffffff',
	},
	img: {
		width: 16,
		height: 16,
		alignItems: 'center',
		tintColor: "#C4C4C4"
	},
	row: {
		padding: 10,
		flexDirection: 'row',
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	buttonview: {
		flexDirection: 'row',
		alignItems: 'stretch',
		marginTop: 20
	},
	button: {
		flex: 1,
		height: 40,
		borderWidth: 0.5,
		borderColor: '#dcdcdc',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#767676',
		fontSize: 18
	},
	copyright: {
		flex: 1,
		alignSelf: 'stretch',
		position: 'absolute',
		left: 0,
		bottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	copyrightText: {
		fontSize: 9
	},
	modalbox: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	
	innerContainer: {
		borderRadius: 5,
		backgroundColor: '#fff',
		paddingTop: 20,
	},

	layoutMenu:{
		paddingTop: 5,
		paddingBottom:5,
		paddingLeft:10,
		paddingRight:10,
		backgroundColor: "white",
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	border:{
		borderBottomWidth: 1, 
		borderBottomColor: '#f2f2f2'
	},
	icon:{
		width: 28,
        height: 28,
        tintColor: '#c10b3b',
	}
})
export const StyleCondition = StyleSheet.create({
	contain: {
		flex: 1,
		flexDirection: 'column'
	},
	containTop: {
		alignItems: 'center',
		alignContent: 'center',
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	image: {
		width: 200,
		height: 120
	},
	buttonText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16
	},
	button: {
		height: 80,
		width: 80,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		borderRadius: 80,
		borderWidth: 1,
		borderColor: 'white',
		backgroundColor: '#606668',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowColor: 'black',
		shadowOpacity: 0.3,
	},
})