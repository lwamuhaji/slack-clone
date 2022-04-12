import { CollapseButton } from '@components/DMList/styles';
import { IChannel } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState, VFC } from 'react';
import { useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

const ChannelList: VFC = () => {
  const { workspace } = useParams();
  const location = useLocation();
  const { data: userData } = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
  const [channelCollapse, setChannelCollapse] = useState(false);
  //   const [countList, setCountList] = useState()

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            // const isOnline = onlineList.includes(member.id);
            // const count = countList[member.id] || 0;
            return (
              <NavLink
                key={channel.id}
                to={`/workspace/${workspace}/channel/${channel.name}`}
                className={({ isActive }) => (isActive ? 'selected' : undefined)}
              >
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    false ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                  }`}
                  aria-hidden="true"
                  data-qa="presence_indicator"
                  data-qa-presence-self="false"
                  data-qa-presence-active="false"
                  data-qa-presence-dnd="false"
                />
                <span>{channel.name}</span>
                {channel.id === userData?.id && <span> (나)</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
