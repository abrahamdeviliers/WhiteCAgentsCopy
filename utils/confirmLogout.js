import { Alert } from 'react-native';

export function confirmLogout(navigation) {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
          });
        },
      },
    ],
    { cancelable: true }
  );
}
