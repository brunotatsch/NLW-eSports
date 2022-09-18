import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import { RoutesParams } from '../../@types/navigation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { useState, useEffect } from 'react';
import { styles } from "./styles";
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {
  const navagation = useNavigation();
  const route = useRoute();
  const game = route.params as RoutesParams;

  function handleGoBack() {
    navagation.goBack();
  }

  async function getDiscordUser(adsId: string) {

    fetch(`http://192.168.100.100:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
  }

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('')

  useEffect(() => {
    fetch(`http://192.168.100.100:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  })

  return (


    < Background >
      <SafeAreaView style={styles.container}>
        <View style={styles.header} >
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />


      </SafeAreaView>
    </Background >
  )
}