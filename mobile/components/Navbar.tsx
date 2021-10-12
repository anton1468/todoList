/* eslint-disable max-len */
import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { StyleSheet, Text, View, Button } from 'react-native';

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event: any) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };
  
    return (
      <div>
        <NavLink to='/create'>Create</NavLink>
        <NavLink to='/links'>All todos</NavLink>
        <a href='/' onClick={logoutHandler}>Logout</a>
      </div>
    );
    }
  
//   return (
//     <View style={styles.navbar}>
//       <Text style={styles.text}>Todo App</Text>
//       <View style={styles.button}>
//         <Button
//           onPress={logoutHandler}
//           title='Log-out'
//         /></View>
//       {/* <ActivityIndicator size={'small'} color="#fff" style={styles.loader}/> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   navbar: {
//     height: 90,
//     justifyContent: 'flex-end',
//     backgroundColor: '#3949ab',
//     paddingBottom: 10,
//   },
//   loader: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//   },
//   button: {
//     display: 'flex',
//     alignSelf: 'flex-end',
//     position: 'absolute',
//     width: '100%',
//     top: 0,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     alignSelf: 'center',
//   },
//   buttonItem: {
//     width: 40,
//   },
// });

export default Navbar;




// export default Navbar;
