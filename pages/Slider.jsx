import { Image, StyleSheet, View, Button, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { setImagesLoaded } from '../redux/actions'
import * as ScreenOrientation from 'expo-screen-orientation';

export function Slider() {
  const [SLIDER_WIDTH, setSLIDER_WIDTH] = useState(Dimensions.get('window').width + 80);
  const [SLIDER_HEIGHT, setSLIDER_HEIGHT] = useState(Dimensions.get('window').height * 0.7);
  const [ITEM_WIDTH, setITEM_WIDTH] = useState(Math.round(SLIDER_WIDTH * 0.7));

  useEffect(() => {
    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      setSLIDER_WIDTH(Dimensions.get('window').width + 80)
      setSLIDER_HEIGHT(Dimensions.get('window').height * 0.7)
      setITEM_WIDTH(Math.round(SLIDER_WIDTH * 0.7))
    });

    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    }
  }, []);

  const navigation = useNavigation();

  const { imagesLoaded } = useSelector(state => state.data)
  const dispatch = useDispatch()

  const data = [
    {
      imgUrl: "https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg",
    },
    {
      imgUrl: "https://imagenes.elpais.com/resizer/-2RgweHWDBul_IKk-V9vt53ds7s=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/G66M3K36XBCGPO5FQ5R6YC5K3M.jpg",
    },
    {
      imgUrl: "https://thefoodtech.com/wp-content/uploads/2022/01/agricultura-de-conservacion-scaled.jpg",
    },
    {
      imgUrl: "https://www.randstad.es/wp-content/uploads/2016/08/innovar-y-modernizar-la-agricultura-880.jpg",
    },
    {
      imgUrl: "https://spherag.com/wp-content/uploads/2022/01/foto-cabecera-2.jpg",
    },
  ];

  const CarouselCardItem = ({ item, index }) => {

    const lastPictureButton = () => {
      return (
        <View style={{ margin: 10, marginBottom: 0 }}>
          <Button title="Go to Table responsive" style={carouselStyles.lastPictureButton} onPress={() => navigation.navigate("Table responsive")}></Button>
        </View>
      );
    };

    return (
      <View style={carouselStyles.container} key={index}>
        <Image
          source={{ uri: item.imgUrl }}
          style={carouselStyles.image}
          onLoadEnd={() => {
            if (imagesLoaded.length < 5)
              dispatch(setImagesLoaded(true))
          }
          }
        />
        {(index == 4) ? lastPictureButton() : <></>}
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: "center",
      width: SLIDER_WIDTH
    },
    tinyLogo: {
      width: 40,
      height: 50,
      marginLeft: -5,
      alignSelf: "center",
    },
    imageContainer: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: "center",
      width: 100,
      height: 100,
      backgroundColor: 'red',
      borderRadius: 50,
    },
    carouselContainer: {
      display: 'flex',
      backgroundColor: "#fff",
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: "center",
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT,
    },
  })
  
  
  const carouselStyles = StyleSheet.create({
    container: {
      backgroundColor: 'lightblue',
      borderRadius: 8,
      width: ITEM_WIDTH,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
      paddingTop: 10,
      paddingBottom: 10,
    },
    image: {
      width: ITEM_WIDTH,
      height: 300,
    },
    lastPictureButton: {
      fontSize: 22,
      paddingLeft: 20,
      paddingLeft: 20,
      paddingRight: 20,
      width: ITEM_WIDTH,
      marginTop: 100,
    }
  })
  

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, imagesLoaded.length !== 5 ? { display: 'flex' } : { display: 'none' }]}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/logo_escudo.png')}
        />
      </View>
      <View style={[styles.carouselContainer, imagesLoaded.length === 5 ? { display: 'flex' } : { display: 'none' }]}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
    </View>
  );
}