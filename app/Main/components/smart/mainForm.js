import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import Explore from '../../../Explore/containers/explore';
import Account from '../../../Account/containers/account';
import Clients_Coaches from '../../../Clients_Coaches/containers/clients_coaches';
import ClientProfile from '../../../Profile/containers/clientProfile';
import TrainerProfile from '../../../Profile/containers/trainerProfile';
import Inbox from '../../../Inbox/containers/inbox';

import { connect } from 'react-redux';
import localStorage from 'react-native-local-storage';
import * as CommonConstant from '../../../Components/commonConstant';
import { CoachesClients } from '../../../Components/dummyEntries';

const { width, height } = Dimensions.get('window');

const exploreIcon = require('../../../Assets/images/explore.png');
const exploreSelectedIcon = require('../../../Assets/images/selected_explore.png');
const coachesIcon = require('../../../Assets/images/coaches.png');
const coachesSelectedIcon = require('../../../Assets/images/selected_coaches.png');
const clientsIcon = require('../../../Assets/images/clients.png');
const clientsSelectedIcon = require('../../../Assets/images/selected_clients.png');
const inboxIcon = require('../../../Assets/images/inbox.png');
const inboxSelectedIcon = require('../../../Assets/images/selected_inbox.png');
const profileIcon = require('../../../Assets/images/profile.png');
const profileSelectedIcon = require('../../../Assets/images/selected_profile.png');
const accountIcon = require('../../../Assets/images/account.png');
const accountSelectedIcon = require('../../../Assets/images/selected_account.png');


class MainForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'explore',
      badge: 0,
    };

    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content', false);
    }
  }

  componentWillMount() {
    const {auth: {user}} = this.props;
    localStorage.save('authData', {
      token: user.token,
      email: user.email
    })
  }

  render() {
    const { status, user_mode } = this.props;
    let tabNavigator = [
      /* Explore */
      {
        title: "EXPLORE",
        selected: this.state.selectedTab === "explore",
        renderIcon: () => (<Image source={ exploreIcon } style={ styles.iconTabbarGeneral }/>),
        renderSelectedIcon: () => (<Image source={ exploreSelectedIcon } style={ styles.iconTabbarGeneral }/>),
        onPress: () => this.setState({ selectedTab: 'explore' }),
        children: <Explore/>,
      },
      /* Clients or Professional */
      {
        title: user_mode === CommonConstant.user_client ? "PROS" : "CLIENTS",
        selected: this.state.selectedTab === "clients_coaches",
        renderIcon: () => (
          <Image source={ user_mode === CommonConstant.user_client ? coachesIcon : clientsIcon }
                 style={ user_mode === CommonConstant.user_client ? styles.iconTabbarCoaches : styles.iconTabbarClients }/>
        ),
        renderSelectedIcon: () => (
          <Image source={ user_mode === CommonConstant.user_client ? coachesSelectedIcon : clientsSelectedIcon }
                 style={ user_mode === CommonConstant.user_client ? styles.iconTabbarCoaches : styles.iconTabbarClients }/>
        ),
        onPress: () => this.setState({ selectedTab: 'clients_coaches' }),
        children: <Clients_Coaches/>,
      },
      /* Inbox */
      {
        title: "INBOX",
        selected: this.state.selectedTab === "inbox",
        renderIcon: () => (<Image source={ inboxIcon } style={ styles.iconTabbarGeneral }/>),
        renderSelectedIcon: () => (<Image source={ inboxSelectedIcon } style={ styles.iconTabbarGeneral }/>),
        onPress: () => this.setState({ selectedTab: 'inbox' }),
        badgeText: this.state.badge,
        children: <Inbox/>,
      },
      /* Profile */
      {
        title: "PROFILE",
        selected: this.state.selectedTab === "profile",
        renderIcon: () => (<Image source={ profileIcon } style={ styles.iconTabbarProfile }/>),
        renderSelectedIcon: () => (<Image source={ profileSelectedIcon } style={ styles.iconTabbarProfile }/>),
        onPress: () => this.setState({ selectedTab: 'profile' }),
        children: user_mode === CommonConstant.user_client ? <ClientProfile user={ CoachesClients[0] }/> : <TrainerProfile user={ CoachesClients[0] }/>,
      },
      /* Account*/
      {
        title: "ACCOUNT",
        selected: this.state.selectedTab === "account",
        renderIcon: () => (<Image source={ accountIcon } style={ styles.iconTabbarGeneral }/>),
        renderSelectedIcon: () => (<Image source={ accountSelectedIcon } style={ styles.iconTabbarGeneral }/>),
        onPress: () => this.setState({ selectedTab: 'account' }),
        children: <Account/>,
      },
    ];
    return (
      <View style={ styles.container }>
        <TabNavigator
          tabBarStyle={ styles.tab }
        >
          {
            tabNavigator.map((tab, index) => (
              <TabNavigator.Item
                key={ index }
                selected={ tab.selected }
                title={ tab.title }
                badgeText={ tab.badgeText }
                renderIcon={ tab.renderIcon }
                renderSelectedIcon={ tab.renderSelectedIcon }
                onPress={ tab.onPress }>
                { tab.children }
              </TabNavigator.Item>
            ))
          }
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  iconTabbarGeneral: {
    height: 25,
    width: 25,
  },
  iconTabbarCoaches: {
    height: 25,
    width: 33,
  },
  iconTabbarClients: {
    height: 24,
    width: 43,
  },
  iconTabbarProfile: {
    height: 26,
    width: 22,
  },
  tab: {
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderTopColor: '#d7d7d7',
    paddingBottom: 3,
    paddingTop: 3,
    height: 52,
  },
});

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({})
)(MainForm);