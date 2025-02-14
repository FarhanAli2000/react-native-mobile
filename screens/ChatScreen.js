import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { GiftedChat, Bubble, Send, InputToolbar, Actions } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId, name, productInfo } = route.params;

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'What is your best price?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'User',
        avatar: null,
      },
    },
    {
      _id: 2,
      text: 'The price is negotiable. What do you offer?',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'You',
        avatar: null,
      },
    },
  ]);
  const [offer, setOffer] = useState(null);
  const [showProductInfo, setShowProductInfo] = useState(false);

  const CustomHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>{name}</Text>
        <Text style={styles.headerStatus}>Online</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton} onPress={handleReport}>
          <Icon name="flag-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleBlock}>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleReport = () => {
    Alert.alert(
      "Report User",
      "Are you sure you want to report this user?",
      [
        { text: "Cancel" },
        { text: "Report", onPress: () => Alert.alert("Report Submitted") }
      ]
    );
  };

  const handleBlock = () => {
    Alert.alert(
      "More Options",
      null,
      [
        { text: "Block User", onPress: () => Alert.alert("User Blocked") },
        { text: "Clear Chat", onPress: () => setMessages([]) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleMakeOffer = () => {
    Alert.prompt(
      "Make an Offer",
      "Enter your offer amount in PKR:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: (amount) => {
            if (amount) {
              const offerMessage = {
                _id: Math.round(Math.random() * 1000000),
                text: `I offer Rs. ${amount} for this item.`,
                createdAt: new Date(),
                user: {
                  _id: 1,
                },
                isOffer: true,
                offerAmount: amount
              };
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [offerMessage])
              );
              setOffer(amount);
            }
          }
        }
      ],
      'plain-text'
    );
  };

  const renderProductInfo = () => (
    <TouchableOpacity
      style={styles.productInfoBar}
      onPress={() => setShowProductInfo(true)}
    >
      <Image
        source={productInfo?.image || require('../assets/car1.jpeg')}
        style={styles.productThumbnail}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {productInfo?.title || 'Product Title'}
        </Text>
        <Text style={styles.productPrice}>{productInfo?.price || 'Price not set'}</Text>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity
          style={styles.offerButton}
          onPress={handleMakeOffer}
        >
          <Text style={styles.offerButtonText}>Make Offer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderBubble = (props) => {
    if (props.currentMessage.isOffer) {
      return (
        <View style={[
          styles.offerBubble,
          props.position === 'left' ? styles.offerBubbleLeft : styles.offerBubbleRight
        ]}>
          <Icon name="tag-outline" size={20} color="#2D4495" />
          <Text style={styles.offerText}>{props.currentMessage.text}</Text>
          <View style={styles.offerButtons}>
            <TouchableOpacity
              style={styles.offerActionButton}
              onPress={() => handleAcceptOffer(props.currentMessage.offerAmount)}
            >
              <Text style={styles.offerActionButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.offerActionButton, styles.offerActionButtonDecline]}
              onPress={() => handleDeclineOffer()}
            >
              <Text style={[styles.offerActionButtonText, { color: '#2D4495' }]}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme.colors.primary.primary1,
          },
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#000',
          },
        }}
      />
    );
  };

  const handleAcceptOffer = (amount) => {
    Alert.alert(
      "Accept Offer",
      `Are you sure you want to accept the offer of Rs. ${amount}?`,
      [
        { text: "Cancel" },
        {
          text: "Accept",
          onPress: () => {
            const systemMessage = {
              _id: Math.round(Math.random() * 1000000),
              text: `Offer of Rs. ${amount} has been accepted`,
              createdAt: new Date(),
              system: true,
            };
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, [systemMessage])
            );
          }
        }
      ]
    );
  };

  const handleDeclineOffer = () => {
    Alert.prompt(
      "Decline Offer",
      "Would you like to make a counter offer?",
      [
        {
          text: "Just Decline",
          style: "destructive",
          onPress: () => {
            const systemMessage = {
              _id: Math.round(Math.random() * 1000000),
              text: "Offer has been declined",
              createdAt: new Date(),
              system: true,
            };
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, [systemMessage])
            );
          }
        },
        { text: "Cancel", style: "cancel" },
        {
          text: "Counter Offer",
          onPress: () => handleMakeOffer()
        }
      ]
    );
  };

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.inputPrimary}
    />
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <View style={styles.sendButton}>
        <Icon name="send" size={24} color="#2D4495" />
      </View>
    </Send>
  );

  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={styles.actionsContainer}
      icon={() => (
        <Icon name="paperclip" size={24} color="#2D4495" />
      )}
      options={{
        'Share Location': () => {
          Alert.alert('Location', 'Location sharing functionality will be implemented');
        },
        'Send Image': () => {
          Alert.alert('Image', 'Image sending functionality will be implemented');
        },
        Cancel: () => {},
      }}
    />
  );

  const ProductInfoModal = () => (
    <Modal
      visible={showProductInfo}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowProductInfo(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Product Details</Text>
            <TouchableOpacity
              onPress={() => setShowProductInfo(false)}
              style={styles.modalClose}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Image
            source={productInfo?.image || require('../assets/car1.jpeg')}
            style={styles.modalImage}
            resizeMode="cover"
          />

          <Text style={styles.modalProductTitle}>{productInfo?.title}</Text>
          <Text style={styles.modalProductPrice}>{productInfo?.price}</Text>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowProductInfo(false);
                handleMakeOffer();
              }}
            >
              <Text style={styles.modalButtonText}>Make Offer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={() => {
                setShowProductInfo(false);
                navigation.navigate('AdDetailScreen', { id: productInfo?.id });
              }}
            >
              <Text style={styles.modalButtonTextSecondary}>View Full Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader />
      {renderProductInfo()}
      <ProductInfoModal />

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderAvatar={null}
        alwaysShowSend
        scrollToBottom
        inverted={Platform.OS !== 'web'}
        placeholder="Type a message..."
        timeTextStyle={{
          right: { color: '#fff' },
          left: { color: '#666' }
        }}
        maxComposerHeight={100}
        bottomOffset={Platform.OS === 'ios' ? 30 : 0}
        listViewProps={{
          contentContainerStyle: {
            flexGrow: 1,
            justifyContent: 'flex-end',
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerBack: {
    padding: 5,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerStatus: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
  },
  productInfoBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  productThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    color: theme.colors.primary.primary1,
    fontWeight: 'bold',
  },
  productActions: {
    marginLeft: 10,
  },
  offerButton: {
    backgroundColor: theme.colors.primary.primary1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  inputPrimary: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  sendButton: {
    padding: 8,
  },
  offerBubble: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary.primary1,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  offerBubbleLeft: {
    alignSelf: 'flex-start',
  },
  offerBubbleRight: {
    alignSelf: 'flex-end',
  },
  offerText: {
    color: theme.colors.primary.primary1,
    marginVertical: 5,
  },
  offerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  offerActionButton: {
    backgroundColor: '#2D4495',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  offerActionButtonDecline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.primary.primary1,
  },
  offerActionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalClose: {
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalProductPrice: {
    fontSize: 18,
    color: theme.colors.primary.primary1,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: theme.colors.primary.primary1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.primary.primary1,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtonTextSecondary: {
    color: theme.colors.primary.primary1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginLeft: 10,
    marginBottom: 0,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;