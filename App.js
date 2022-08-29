import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { TableResponsive } from "./pages/TableResponsive";
import { Map } from "./pages/Map";
import { Slider } from "./pages/Slider";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';

const Menu = createDrawerNavigator();

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  function round(n) {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  }



  useEffect(() => {
    const { x, y, z } = data;
    if (x >= 0.6) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    else if (x < -0.6) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    if (y >= 0.6) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [data]);

  return (
    // <Text>
    //   xx: {round(x)} y: {round(y)} z: {round(z)}
    // </Text>
    <Provider store={Store}>
      <NavigationContainer>
        <Menu.Navigator>
          <Menu.Screen name="Slider" component={Slider} />
          <Menu.Screen name="Table responsive" component={TableResponsive} />
          <Menu.Screen name="Map" component={Map} />
        </Menu.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
