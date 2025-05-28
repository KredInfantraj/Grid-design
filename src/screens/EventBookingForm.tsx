import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';

const EventBookingForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    ticketType: '',
    quantity: '1',
    specialRequests: ''
  });

  // Date picker state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Event and ticket options
  const eventTypes = [
    { label: 'Music Concert', value: 'music' },
    { label: 'Sports Event', value: 'sports' },
    { label: 'Theater Show', value: 'theater' },
    { label: 'Conference', value: 'conference' },
  ];

  const ticketTypes = [
    { label: 'General Admission', value: 'general' },
    { label: 'VIP', value: 'vip' },
    { label: 'Premium', value: 'premium' },
    { label: 'Student', value: 'student' },
  ];

  const quantities = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1} ticket${i > 0 ? 's' : ''}`,
    value: `${i + 1}`
  }));

  // Handle form input changes
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle date change
  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.eventType || !formData.ticketType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const bookingDetails = {
      ...formData,
      bookingDate: date.toISOString()
    };

    Alert.alert(
      'Booking Successful',
      `Thank you ${formData.name}! Your tickets for ${formData.eventType} have been booked.`,
      [{ text: 'OK' }]
    );

    // Here you would typically send the data to your backend
    console.log('Booking details:', bookingDetails);
  };

  return (
    <LinearGradient colors={['#101010', '#232323']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
            style={styles.headerImage}
          />
          <Text style={styles.headerTitle}>Book Your Tickets</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Personal Information Section */}
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            placeholderTextColor="#888"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email *"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />

          {/* Event Details Section */}
          <Text style={styles.sectionTitle}>Event Details</Text>
          
          <TouchableOpacity 
            style={styles.input} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {formatDate(date)}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
              minimumDate={new Date()}
              themeVariant="dark"
            />
          )}
          
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('eventType', value)}
              items={eventTypes}
              placeholder={{ label: 'Select Event Type *', value: null }}
              style={pickerSelectStyles}
              value={formData.eventType}
            />
          </View>
          
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('ticketType', value)}
              items={ticketTypes}
              placeholder={{ label: 'Select Ticket Type *', value: null }}
              style={pickerSelectStyles}
              value={formData.ticketType}
            />
          </View>
          
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('quantity', value)}
              items={quantities}
              placeholder={{ label: 'Select Quantity', value: '1' }}
              style={pickerSelectStyles}
              value={formData.quantity}
            />
          </View>

          {/* Special Requests */}
          <Text style={styles.sectionTitle}>Special Requests</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Any special requirements?"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={formData.specialRequests}
            onChangeText={(text) => handleInputChange('specialRequests', text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#b5ff00', '#8fd200']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.submitButtonText}>Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

// Custom styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: 'white',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: 'white',
    paddingRight: 30,
  },
  placeholder: {
    color: '#888',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: 150,
    opacity: 0.8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b5ff00',
    marginTop: 15,
    textShadowColor: 'rgba(181, 255, 0, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b5ff00',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#181818',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: 'white',
    borderWidth: 1,
    borderColor: '#333',
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#181818',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#b5ff00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
  submitButtonText: {
    color: '#101010',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventBookingForm;