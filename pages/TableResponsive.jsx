import { StyleSheet, ScrollView, Image, Button } from 'react-native'
import { useEffect } from 'react'
import { rootUrl } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import { setBusTopData } from '../redux/actions'
import { DataTable } from 'react-native-paper';

export function TableResponsive() {
  const { busStopData } = useSelector(state => state.data)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`${rootUrl}servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus?rf=html&srsname=wgs84&start=0&rows=50&distance=500`,
      {
        method: 'GET',
        headers: {
          accept: 'application/geo+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        dispatch(setBusTopData(data))
      })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 0, marginRight: 10}}>Icon</DataTable.Title>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title style={{flex: 6}}>Title</DataTable.Title>
          <DataTable.Title>gtfsId</DataTable.Title>
          <DataTable.Title>Timming</DataTable.Title>
          <DataTable.Title>Push</DataTable.Title>
        </DataTable.Header>

        {
          busStopData?.features?.map(({properties}, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{flex: 0, marginRight: 10}}>
                  <Image
                    source={{ uri: `https:${properties.icon}` }}
                    style={styles.busIcon}
                  />
                </DataTable.Cell>
                <DataTable.Cell>{properties.id}</DataTable.Cell>
                <DataTable.Cell style={{flex: 6}}>{properties.title}</DataTable.Cell>
                <DataTable.Cell>{properties.gtfsId}</DataTable.Cell>
                <DataTable.Cell><Button title="See"></Button></DataTable.Cell>
                <DataTable.Cell><Button title="See"></Button></DataTable.Cell>
              </DataTable.Row>
            )
          })
        }

        {/* <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      /> */}
      </DataTable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  busIcon: {
    width: 20,
    height: 20,
  }
})
