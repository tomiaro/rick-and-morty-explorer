import {act} from "react-dom/test-utils";
import {mount} from "enzyme"

import SearchInput from "./SearchInput";
import "../utils/testConfig"
import {ApolloError} from "@apollo/client";
import {GraphQLError} from "graphql";


it("OnChange Success",  () => {
    let wrapper: any = {}

    act(() => {
        wrapper = mount(
            <SearchInput error={undefined} onSearch={onSearch}/>
        )
    })

    function onSearch(search: string) {
        expect(search).toBe("Rick")
    }

    expect(wrapper).toBeTruthy()
    wrapper.find("input").first().simulate("change", {target: {value: "Rick"}})
    expect(wrapper.find("input").first().props().value).toEqual("Rick")
    wrapper.find(".ant-input-search-button").find("button").simulate("click")
})

it("Error SearchInput",  () => {
    let wrapper: any = {}
    const gqlErr: GraphQLError = new GraphQLError("Error")
    const apolloErr:ApolloError = new ApolloError({graphQLErrors:[gqlErr]})

     act(  () => {
        wrapper = mount(
            <SearchInput error={apolloErr} onSearch={((value)=>{})} />
        )
    })

    expect(wrapper).toBeTruthy()
    expect(wrapper.find(".test-error")).not.toHaveLength(0)
    }
)

it("Success SearchInput",  () => {
    let wrapper: any = {}

     act(  () => {
        wrapper = mount(
            <SearchInput error={undefined} onSearch={((value)=>{})} />
        )
    })

    expect(wrapper).toBeTruthy()
    expect(wrapper.find(".test-error")).toHaveLength(0)
    }
)