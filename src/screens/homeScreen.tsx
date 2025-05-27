import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
  StatusBar,
  Alert,
  Linking,
  Platform
} from 'react-native';


import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';



type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  latitude: number;
  longitude: number;
  image: string;
};

const events: Event[] = [
  {
    id: '1',
    title: 'Rock Music Event Night',
    date: 'April 30',
    time: '6:00 PM',
    location: 'New York city',
    price: '$40',
    category: 'Music',
    latitude: 40.7505,
    longitude: -73.9934,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Rock Music Event Night',
    date: 'April 30',
    time: '6:00 PM',
    location: 'New York city',
    price: '$40',
    category: 'Music',
    latitude: 40.7221,
    longitude: -73.9575,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Rock Music Event Night',
    date: 'April 30',
    time: '6:00 PM',
    location: 'New York city',
    price: '$40',
    category: 'Music',
    latitude: 40.7318,
    longitude: -73.9897,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Rock Music Event Night',
    date: 'April 30',
    time: '6:00 PM',
    location: 'New York city',
    price: '$40',
    category: 'Music',
    latitude: 40.7205,
    longitude: -73.9937,
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80',
  },
   {
      id: '5',
      title: 'Classic Rock Night',
      date: 'May 2',
      time: '8:30 PM',
      location: 'Radio City',
      price: '$55',
      category: 'Music',
      latitude: 40.7598,
      longitude: -73.9798,
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '6',
      title: 'Punk Rock Show',
      date: 'May 2',
      time: '9:00 PM',
      location: 'Mercury Lounge',
      price: '$25',
      category: 'Music',
      latitude: 40.7211,
      longitude: -73.9883,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '7',
      title: 'Alternative Night',
      date: 'May 3',
      time: '8:00 PM',
      location: 'Terminal 5',
      price: '$40',
      category: 'Music',
      latitude: 40.7725,
      longitude: -73.9932,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '8',
      title: 'Rock & Roll Party',
      date: 'May 3',
      time: '10:00 PM',
      location: 'Rough Trade',
      price: '$35',
      category: 'Music',
      latitude: 40.7182,
      longitude: -73.9578,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
     {
      id: '9',
      title: 'Rock Night Live',
      date: 'April 30',
      time: '8:20 PM',
      location: 'Madison Square',
      price: '$35',
      category: 'Music',
      latitude: 40.7505,
      longitude: -73.9934,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '10',
      title: 'Guitar Legends',
      date: 'April 30',
      time: '9:00 PM',
      location: 'Brooklyn Bowl',
      price: '$40',
      category: 'Music',
      latitude: 40.7221,
      longitude: -73.9575,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '11',
      title: 'Metal Mayhem',
      date: 'May 1',
      time: '7:30 PM',
      location: 'Webster Hall',
      price: '$45',
      category: 'Music',
      latitude: 40.7318,
      longitude: -73.9897,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '12',
      title: 'Indie Rock Fest',
      date: 'May 1',
      time: '8:00 PM',
      location: 'Bowery Ballroom',
      price: '$30',
      category: 'Music',
      latitude: 40.7205,
      longitude: -73.9937,
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
];
interface PDFResult {
  filePath?: string;
  base64?: string;
}

const HomeScreen = () => {
 

  const [showMap, setShowMap] = useState(false);
  const { width } = useWindowDimensions();
  const numColumns = 2;
  const cardWidth = (width - 36) / numColumns;
  const navigation = useNavigation();
 
  
  const openPDF = async (filePath: string) => {
    try {
      await FileViewer.open(filePath, {
        showOpenWithDialog: true,
        onDismiss: () => console.log('PDF viewer dismissed')
      });
    } catch (error) {
      Alert.alert(
        'Cannot Open PDF',
        'Please install a PDF reader app',
        [
          { 
            text: 'Install PDF Reader', 
            onPress: () => Linking.openURL('market://details?id=com.adobe.reader') 
          },
          { text: 'OK' }
        ]
      );
    }
  };

  const openDownloadsFolder = async () => {
    try {
      if (Platform.OS === 'android') {
        await Linking.openURL('content://com.android.externalstorage.documents/document/primary:Download');
      } else {
        await Linking.openURL('shareddocuments:///Download');
      }
    } catch (error) {
      Alert.alert(
        'Cannot Open Downloads',
        'Please check your file manager app',
        [{ text: 'OK' }]
      );
    }
  };

  const downloadEventPDF = async (event: Event) => {
    try {
   
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .title { font-size: 24px; font-weight: bold; color: #333; margin-bottom: 10px; }
              .image { width: 100%; height: 200px; margin-bottom: 15px; object-fit: cover; }
              .detail { margin-bottom: 8px; font-size: 16px; }
              .label { font-weight: bold; color: #555; }
              .ticket { border: 2px dashed #b5ff00; padding: 15px; border-radius: 10px; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="title">${event.title}</h1>
              <p>Event Ticket</p>
            </div>
            <img class="image" src="${event.image}" />
            <div class="ticket">
              <div class="detail"><span class="label">Date:</span> ${event.date}</div>
              <div class="detail"><span class="label">Time:</span> ${event.time}</div>
              <div class="detail"><span class="label">Location:</span> ${event.location}</div>
              <div class="detail"><span class="label">Price:</span> ${event.price}</div>
              <div class="detail"><span class="label">Category:</span> ${event.category}</div>
            </div>
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #777;">
              Thank you for using our app!
            </div>
          </body>
        </html>
      `;

     
      const downloadsDir = RNFS.DownloadDirectoryPath;
      const fileName = `EventTicket_${event.id}_${Date.now()}.pdf`;
      const filePath = `${downloadsDir}/${fileName}`;

      const options = {
        html: htmlContent,
        fileName: fileName,
        directory: 'Downloads',
        base64: false
      };

      const pdf = await RNHTMLtoPDF.convert(options);

      if (!pdf.filePath) {
        throw new Error('PDF generation failed');
      }

      
      const fileExists = await RNFS.exists(pdf.filePath);
      if (!fileExists) {
        throw new Error('PDF file was not created');
      }

     
      Alert.alert(
        'Ticket Downloaded',
        'Your event ticket has been saved to Downloads folder',
        [
          { text: 'Open Ticket', onPress: () => openPDF(pdf.filePath!) },
          { text: 'View Downloads', onPress: () => openDownloadsFolder() },
          { text: 'OK' }
        ]
      );

    } catch (error: any) {
      console.error('PDF Error:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to generate ticket',
        [
          { text: 'OK' },
          { 
            text: 'Install PDF Reader', 
            onPress: () => Linking.openURL('market://details?id=com.adobe.reader')
          }
        ]
      );
    }
  };


  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity onPress={() => downloadEventPDF(item)} activeOpacity={0.8}>
      <View style={[styles.card, { width: cardWidth }]}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.overlay} />
        <View style={styles.heartIcon}>
          <Text style={{ fontSize: 20, color: '#b5ff00' }}>🤍</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.timeText}> | {item.time}</Text>
          </View>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHorizontalCard = ({ item }: { item: Event }) => (
    <TouchableOpacity onPress={() => downloadEventPDF(item)} activeOpacity={0.8}>
      <View style={styles.horizontalCard}>
        <Image source={{ uri: item.image }} style={styles.horizontalCardImage} />
        <View style={styles.overlay} />
        <View style={styles.heartIconSmall}>
          <Text style={{ fontSize: 16, color: '#b5ff00' }}>🤍</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.timeText}> | {item.time}</Text>
          </View>
          <Text style={styles.cardTitleSmall} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.locationTextSmall} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
     
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>🎟️ Book Events</Text>
        <Text style={styles.headerSubtitle}>Find and book the best rock events in NYC</Text>
      </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.crudButton}
        onPress={() => navigation.navigate('CrudScreen' as never)}
      >
        <Text style={styles.crudButtonIcon}>✏️</Text>
        <Text style={styles.crudButtonText}>Manage Events</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.crudButton}
        onPress={() => navigation.navigate('Ticket' as never)}
      >
        <Text style={styles.crudButtonIcon}>🎟️</Text>
        <Text style={styles.crudButtonText}>View Tickets</Text>
      </TouchableOpacity>
    </View>


      {showMap ? (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
        latitude: 40.7505,
        longitude: -73.9934,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
  }}
  style={StyleSheet.absoluteFillObject}
>
  {events.map(event => (
    <Marker
      key={event.id}
      coordinate={{
        latitude: event.latitude,
        longitude: event.longitude,
      }}
      title={event.title}
      description={event.location}
    />
  ))}
</MapView>
          <FlatList
            data={events}
            renderItem={renderHorizontalCard}
            keyExtractor={item => item.id}
            horizontal
            style={styles.horizontalList}
            contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 70 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <FlatList
          key={`grid-${numColumns}`}
          data={events}
          renderItem={renderEventCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
        />
      )}

     
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowMap(!showMap)}
        activeOpacity={0.85}
      >
        <Text style={styles.floatingButtonIcon}>
          {showMap ? '📋' : '🗺️'}
        </Text>
        <Text style={styles.floatingButtonText}>
          {showMap ? ' List' : ' Map'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
 
  headerSection: {
    paddingTop: 36,
    paddingBottom: 18,
    backgroundColor: '#101010',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#232323',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#b5ff00',
    textShadowColor: '#232323',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#b5ff00',
    opacity: 0.7,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 100, 
  },
  card: {
    margin: 6,
    backgroundColor: '#181818',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    borderWidth: 2,
    borderColor: '#232323',
    shadowColor: '#b5ff00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,16,16,0.38)',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(16,16,16,0.7)',
    borderRadius: 16,
    padding: 2,
  },
  cardFooter: {
    padding: 8,
    paddingTop: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dateText: {
    color: '#b5ff00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#b5ff00',
    fontSize: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 2,
  },
  locationText: {
    color: '#b5ff00',
    fontSize: 12,
    marginBottom: 2,
  },

  horizontalCard: {
    width: 170,
    height: 110,
    marginRight: 12,
    backgroundColor: '#181818',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    borderWidth: 2,
    borderColor: '#232323',
    position: 'relative',
  },
  horizontalCardImage: {
    width: '100%',
    height: 60,
    resizeMode: 'cover',
  },
  heartIconSmall: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: 'rgba(16,16,16,0.7)',
    borderRadius: 12,
    padding: 1,
  },
  cardTitleSmall: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 2,
  },
  locationTextSmall: {
    color: '#b5ff00',
    fontSize: 11,
    marginBottom: 2,
  },
  horizontalList: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  floatingButton: {
    position: 'absolute',
    alignSelf: 'center',
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 36, 
    backgroundColor: '#181818',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#b5ff00',
    paddingVertical: 8,
    shadowColor: '#b5ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 20,
  },
  floatingButtonIcon: {
    fontSize: 18,
    color: '#b5ff00',
    marginRight: 4,
  },
  floatingButtonText: {
    color: '#b5ff00',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
 buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 15,
  paddingHorizontal: 20,
  marginBottom: 20,
  marginTop: 15,
},

crudButton: {
  backgroundColor: 'transparent',
  paddingHorizontal: 22,
  paddingVertical: 12,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: '#b5ff00',
  shadowColor: '#b5ff00',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.4,
  shadowRadius: 10,
  elevation: 5,
  minWidth: 150,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
},

crudButtonText: {
  color: '#b5ff00',
  fontWeight: 'bold',
  fontSize: 14,
  marginLeft: 8,
  letterSpacing: 0.5,
},

crudButtonIcon: {
  fontSize: 16,
  color: '#b5ff00',
},
});


export default HomeScreen;