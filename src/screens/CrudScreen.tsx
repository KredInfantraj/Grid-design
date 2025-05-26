import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useItemStore } from '../store/UserItemStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CrudScreen = () => {
  const { items, addItem, updateItem, deleteItem, getItem } = useItemStore();

  const [name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

 const viewAllStorageKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log('All storage keys:', keys);
  };

  const viewZustandData = async () => {
    const data = await AsyncStorage.getItem('item-storage');
    console.log('Persisted items:', JSON.parse(data || '{}'));
  };

 useEffect(() => {
    viewAllStorageKeys();
    viewZustandData();
  }, []);



  const handleAddOrUpdate = () => {
    if (name && Location) {
      if (editId) {
        updateItem(editId, name, Location);
      } else {
        addItem(name, Location);
      }
      resetForm();
    }
  };

  const handleEdit = (id: string) => {
    const item = getItem(id);
    if (item) {
      setName(item.name);
      setLocation(item.Location);
      setEditId(id);
      setModalVisible(true);
    }
  };

  const resetForm = () => {
    setName('');
    setLocation('');
    setEditId(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: typeof items[0] }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
      android_ripple={{ color: '#1e3a1e' }}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.Location}</Text>
        <View style={styles.itemActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.actionButtonText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteItem(item.id)}
          >
            <Text style={styles.actionButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Items</Text>
        <View style={styles.headerDivider} />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ ADD NEW ITEM</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No items yet</Text>
            <Text style={styles.emptySubtext}>Tap the button above to add your first item</Text>
          </View>
        }
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetForm}
      >
        <Pressable style={styles.modalOverlay} onPress={resetForm}>
          <View style={styles.modalContainer}>
            <Pressable>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editId ? 'EDIT ITEM' : 'ADD NEW ITEM'}
                </Text>
              </View>
              <View style={styles.modalBody}>
                <TextInput
                  style={styles.input}
                  placeholder="Event name"
                  placeholderTextColor="#9e9e9e"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  placeholder="Location"
                  placeholderTextColor="#9e9e9e"
                  value={Location}
                  onChangeText={setLocation}
                  multiline
                />
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={resetForm}
                >
                  <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleAddOrUpdate}
                  disabled={!name || !Location}
                >
                  <Text style={styles.saveButtonText}>
                    {editId ? 'UPDATE' : 'SAVE'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#1e1e1e',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { height: 2, width: 0 },
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#4CAF50', 
  },
  headerDivider: {
    height: 2,
    backgroundColor: '#333333',
    marginTop: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  item: {
    backgroundColor: '#1e1e1e', 
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { height: 1, width: 0 },
    overflow: 'hidden',
    borderColor: '#333333',
    borderWidth: 1,
  },
  itemPressed: {
    backgroundColor: '#252525',
  },
  itemContent: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50', 
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#9e9e9e', 
    marginBottom: 12,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2e2e2e', 
    borderColor: '#4CAF50', 
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: '#2e2e2e', 
    borderColor: '#f44336', 
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4CAF50', 
  },
  deleteButtonText: {
    color: '#f44336', 
  },
  addButton: {
    backgroundColor: '#4CAF50', 
    padding: 14,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1e1e1e', 
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 8,
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50', 
    textAlign: 'center',
  },
  modalBody: {
    padding: 16,
  },
  input: {
    backgroundColor: '#2e2e2e', 
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#2e2e2e', 
    borderColor: '#757575',
    borderWidth: 1,
  },
  cancelButtonText: {
    color: '#9e9e9e',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default CrudScreen;