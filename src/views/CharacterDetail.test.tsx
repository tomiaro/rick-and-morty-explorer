import {getCharacterDetail} from "../store/graphql/character/queries";
import {MockedProvider} from "@apollo/client/testing";
import {act} from "react-dom/test-utils";
import {mount} from "enzyme"
import wait from "waait"
import CharacterDetail from "./CharacterDetail";
import {Route, MemoryRouter} from 'react-router-dom';
import "../utils/testConfig"



const mockCharacterData: any = {
    request: {query: getCharacterDetail, variables: {id: "1"}},
    result: {
        data: {
            character: {
                id: "1",
                name: "Rick S",
                type: "",
                status: "Alive",
                gender: "Male",
                species: "Human",
                image:"xxxxx",
                origin: {
                    id: 1,
                    name: "Earth"
                },
                location: {
                    id: "1",
                    name: "Earth"
                },
                episode: [{
                    id: "1",
                    name: "pilot"
                }]
            }
        }
    }
}

const mockCharacterDataError: any = {
    request: {query: getCharacterDetail, variables: {id: "1"}},
    error: new Error("Some Error")

}

it("Success Character Detail", async () => {
    let wrapper: any = {}
    await act( async () => {
        wrapper = mount(
            <MockedProvider addTypename={false} mocks={[mockCharacterData]}>
                <MemoryRouter initialEntries={['/character/1']}>
                    <Route path={"/character/:id"}>
                        <CharacterDetail/>
                    </Route>
                </MemoryRouter>
            </MockedProvider>
        )
    })
    await act(() =>  wait(0))
    expect(wrapper).toBeTruthy()

    wrapper.update()

    expect(wrapper.find(".test-success").first().props().title).toBe("Rick S")
    }
)

it("Loading Character Detail",  () => {
    let wrapper: any = {}
     act(  () => {
        wrapper = mount(
            <MockedProvider addTypename={false} mocks={[mockCharacterData]}>
                <MemoryRouter initialEntries={['/character/1']}>
                    <Route path={"/character/:id"}>
                        <CharacterDetail/>
                    </Route>
                </MemoryRouter>
            </MockedProvider>
        )
    })

    expect(wrapper).toBeTruthy()
    expect(wrapper.find(".test-loading")).not.toHaveLength(0)
    }
)

it("Error Character Detail", async () => {
    let wrapper: any = {}
    await act( async () => {
        wrapper = mount(
            <MockedProvider addTypename={false} mocks={[mockCharacterDataError]}>
                <MemoryRouter initialEntries={['/character/1']}>
                    <Route path={"/character/:id"}>
                        <CharacterDetail/>
                    </Route>
                </MemoryRouter>
            </MockedProvider>
        )
    })
    await act(() =>  wait(0))
    expect(wrapper).toBeTruthy()

    wrapper.update()
    expect(wrapper.find(".test-error")).not.toHaveLength(0)
    })