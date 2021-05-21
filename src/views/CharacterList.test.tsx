import {getCharacterList} from "../store/graphql/character/queries";
import {MockedProvider} from "@apollo/client/testing";
import {act} from "react-dom/test-utils";
import {mount} from "enzyme"
import wait from "waait"
import {Route, MemoryRouter} from 'react-router-dom';
import "../utils/testConfig"
import CharacterList from "./CharacterList";


const mockCharacterListData: any = {
    request: {query: getCharacterList, variables: {page: 1, name: ""}},
    result: {
        data: {
            characters: {
                info: {
                    count: 671
                },
                results: [
                    {
                        id: "1",
                        name: "Rick Sanchez",
                        status: "Alive",
                        species: "Human"
                    },
                    {
                        id: "2",
                        name: "Morty Smith",
                        status: "Alive",
                        species: "Human"
                    }
                ]
            }
        }
    }

}

const mockCharacterListError: any = {
    request: {query: getCharacterList, variables: {page: 1, name: ""}},
    error: new Error("Some Error")
}

it("Sucess Character List", async () => {
        let wrapper: any ={}
        await act(async () => {
            wrapper = mount(
                <MockedProvider addTypename={false} mocks={[mockCharacterListData]}>
                    <MemoryRouter initialEntries={['/character']}>
                        <Route path={"/character"}>
                            <CharacterList/>
                        </Route>
                    </MemoryRouter>
                </MockedProvider>
            )
        })
        await act(() => wait(0))
        expect(wrapper).toBeTruthy()
        wrapper.update()
        expect(wrapper.find(".test-success").first().text()).toBe("Rick Sanchez")
    }
)

it("Loading Character List", () => {
        let wrapper:any = {}
        act(() => {
            wrapper = mount(
                <MockedProvider addTypename={false} mocks={[mockCharacterListData]}>
                    <MemoryRouter initialEntries={['/character']}>
                        <Route path={"/character"}>
                            <CharacterList/>
                        </Route>
                    </MemoryRouter>
                </MockedProvider>
            )
        })

        expect(wrapper).toBeTruthy()
        expect(wrapper.find(".test-loading")).not.toHaveLength(0)

    }
)

it("Error Character List", async () => {
        let wrapper:any = {}
        await act(async () => {
            wrapper = mount(
                <MockedProvider addTypename={false} mocks={[mockCharacterListError]}>
                    <MemoryRouter initialEntries={['/character']}>
                        <Route path={"/character"}>
                            <CharacterList/>
                        </Route>
                    </MemoryRouter>
                </MockedProvider>
            )
        })
        await act(() => wait(0))
        expect(wrapper).toBeTruthy()
        wrapper.update()

        expect(wrapper.find(".test-error")).not.toHaveLength(0)
    }
)

