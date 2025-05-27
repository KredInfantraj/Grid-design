import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF, { Pdf } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

const { width } = Dimensions.get('window');

const TicketScreen = () => {
  const event = {
    id: 'evt-12345',
    name: 'Summer Music Festival 2025',
    date: 'June 15, 2023 • 7:00 PM',
    venue: 'Central Park, New York',
    price: 49.99,
    seat: 'VIP-12'
  };

  const viewShotRef = React.useRef<ViewShot>(null);

  const generateQRCode = (): string => {
    return JSON.stringify({
      eventId: event.id,
      ticketId: `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      purchaseDate: new Date().toISOString()
    });
  };

  const createPDF = async (): Promise<void> => {
    try {
      if (!viewShotRef.current?.capture) {
        throw new Error('ViewShot capture method not available');
      }
      const result = await viewShotRef.current.capture();
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; background: #181A20; color: #222; }
              .ticket { 
                width: 100%; 
                border-radius: 18px; 
                overflow: hidden;
                background: #fff;
                box-shadow: 0 0 18px rgba(0,0,0,0.2);
                margin: 0 auto;
              }
              .header { 
                background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
                color: white; 
                padding: 24px 0 18px 0; 
                text-align: center;
                border-top-left-radius: 18px;
                border-top-right-radius: 18px;
              }
              .content { padding: 24px 32px; color: #222; }
              .qr-code { margin: 24px auto 8px auto; text-align: center; }
              .footer { 
                background: #f5f5f5; 
                padding: 12px 0; 
                text-align: center;
                font-size: 13px;
                color: #555;
                border-bottom-left-radius: 18px;
                border-bottom-right-radius: 18px;
              }
              .label { color: #666; font-size: 14px; margin-bottom: 2px;}
              .value { color: #222; font-size: 18px; font-weight: bold; margin-bottom: 14px;}
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="header">
                <h1 style="margin:0;">${event.name}</h1>
                <p style="margin:0;">${event.date}</p>
                <p style="margin:0;">${event.venue}</p>
              </div>
              <div class="content">
                <div class="qr-code">
                  <img src="file://${result}" width="170" height="170" />
                </div>
                <p class="label">Ticket Holder:</p>
                <p class="value">John Doe</p>
                <p class="label">Seat:</p>
                <p class="value">${event.seat}</p>
                <p class="label">Price:</p>
                <p class="value">$${event.price}</p>
              </div>
              <div class="footer">
                Present this ticket at the entrance<br/>
                Ticket ID: TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
            </div>
          </body>
        </html>
      `;
      const options = {
        html,
        fileName: `${event.name.replace(/\s+/g, '_')}_Ticket`,
        directory: 'Downloads',
      };
      const file: Pdf = await RNHTMLtoPDF.convert(options);
      if (!file.filePath) {
        throw new Error('PDF file path not available');
      }
      Alert.alert('Success', `PDF saved at ${file.filePath}`);
      const newPath = `${RNFS.DownloadDirectoryPath}/${event.name.replace(/\s+/g, '_')}_Ticket.pdf`;
      await RNFS.moveFile(file.filePath, newPath);
      Alert.alert('Success', 'Ticket saved to Downloads folder!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
      console.error(error);
    }
  };


  const renderCuts = () => (
    <View style={styles.cutsContainer}>
      <View style={styles.cutCircleLeft} />
      <View style={styles.cutCircleRight} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 1 }}
        style={styles.viewShot}
      >
        <View style={styles.ticket}>
          <View style={styles.header}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetails}>{event.date}</Text>
            <Text style={styles.eventDetails}>{event.venue}</Text>
          </View>
          {renderCuts()}
          <View style={styles.qrContainer}>
            <QRCode
              value={generateQRCode()}
              size={170}
              color="#000"
              backgroundColor="#fff"
            />
          </View>
          <View style={styles.ticketInfo}>
            <Text style={styles.label}>Ticket Holder:</Text>
            <Text style={styles.value}>John Doe</Text>
            <Text style={styles.label}>Seat:</Text>
            <Text style={styles.value}>{event.seat}</Text>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>${event.price}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Present this ticket at the entrance</Text>
            <Text style={styles.ticketId}>Ticket ID: TKT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
          </View>
        </View>
      </ViewShot>
      <TouchableOpacity style={styles.downloadButton} onPress={createPDF}>
        <Text style={styles.downloadButtonText}>Download Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

const CIRCLE_RADIUS = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  viewShot: {
    width: width - 32,
    alignSelf: 'center',
  },
  ticket: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    backgroundColor: '#6e8efb',
    paddingTop: 28,
    paddingBottom: 18,
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 16,
    color: '#f5f5f5',
    marginBottom: 2,
  },
  cutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 90,
    width: '100%',
    zIndex: 2,
  },
  cutCircleLeft: {
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS / 2,
    backgroundColor: '#181A20',
    marginLeft: -CIRCLE_RADIUS / 2,
  },
  cutCircleRight: {
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS / 2,
    backgroundColor: '#181A20',
    marginRight: -CIRCLE_RADIUS / 2,
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ticketInfo: {
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 14,
  },
  footer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  ticketId: {
    fontSize: 13,
    color: '#888',
  },
  downloadButton: {
    backgroundColor: '#6e8efb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: width - 64,
    alignSelf: 'center',
    marginTop: 8,
    elevation: 4,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default TicketScreen;
