import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import type { AppBarProps } from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import LinkIconButton from 'components/common/LinkIconButton';
import LogoutConfirmDialog from 'components/common/LogoutConfirmDialog';
import useAuth from 'hooks/useAuth';
import useMounted from 'hooks/useMounted';
import { FC, useState } from 'react';
import sleep from 'utils/sleep';

interface Props extends AppBarProps {
  onToggleMobileSidebar: () => void;
  openDrawer: boolean;
  onToggleDrawer: () => void;
}

const DashboardNavbar: FC<Props> = (props) => {
  const { onToggleMobileSidebar, openDrawer } = props;
  const { logout } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
  const mounted = useMounted();

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    if (mounted.current) {
      setOpenLogoutDialog(false);
    }
  };

  const handleLogout = async () => {
    await sleep(350);
    logout();
  };

  return (
    <StyledAppBar open={openDrawer} elevation={0}>
      <Toolbar>
        <Hidden lgDown>
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton onClick={onToggleMobileSidebar}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <Stack direction="row" spacing={1.5}>
		 <div style={{position:'relative'}}>
		 <IconButton onClick={handleOpenLogoutDialog}>
				<MailIcon style={{width: 30, height : 30}}/>
            </IconButton>
			<div style={{height:15, width:20, backgroundColor: 'red', position:'absolute', left:26, top: 25, fontSize: 11, borderRadius: 50, textAlign: 'center'}}>
				19
			</div>
		 </div>
            <div style={{display: 'flex'}}>
              <LinkIconButton to="/user/profile">
                <IconButton>
                  <AccountCircleIcon style={{width: 30, height : 30}}/>
                </IconButton>
              </LinkIconButton>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{color: '#707070', fontSize: 12}}>Admin</span>
                <span style={{color: '#707070', fontSize: 12}}>Administrator</span>
              </div>
            </div>
            <IconButton onClick={handleOpenLogoutDialog}>
              <a style={{ textDecoration: 'underline', fontSize: 14 }}>
                Đăng xuất
              </a>
            </IconButton>
          </Stack>
          <LogoutConfirmDialog
            open={openLogoutDialog}
            onClose={handleCloseLogoutDialog}
            onSubmit={handleLogout}
            content={{
              label: 'Logout',
              description: 'Are you sure you want to logout now?',
              icon: LogoutIcon,
            }}
          />
        </Hidden>
      </Toolbar>
      <Divider />
    </StyledAppBar>
  );
};

interface StyledAppBarProps extends AppBarProps {
  open: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop: string) => !['open'].includes(prop),
})<StyledAppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 280,
    width: 'calc(100% - 280px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('lg')]: {
    marginLeft: 'revert',
    width: '100%',
  },
}));

export default DashboardNavbar;
